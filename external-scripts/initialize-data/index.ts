/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import inquirer, { type PromptModule } from 'inquirer';
import { ObjectId } from 'mongodb';
import { AppError } from 'named-app-errors';

import { getEnv } from 'universe/backend/env';
import { debugNamespace as namespace } from 'universe/constants';

import { debugFactory } from 'multiverse/debug-extended';
import { getDb } from 'multiverse/mongo-schema';

import type { InternalBallot, InternalElection } from 'universe/backend/db';
import { getRandomFakeElectionData } from './question-generator';

const debugNamespace = `${namespace}:initialize-data`;

const log = debugFactory(debugNamespace);
const debug = debugFactory(`${debugNamespace}:debug`);
const logOrDebug = () => {
  return log.enabled ? log : debug;
};

// eslint-disable-next-line no-console
log.log = console.info.bind(console);

// ? Ensure this next line survives Webpack
if (!globalThis.process.env.DEBUG && getEnv().NODE_ENV !== 'test') {
  debugFactory.enable(
    `${debugNamespace},${debugNamespace}:*,-${debugNamespace}:debug`
  );
}

/**
 * Returns the `inquirer` instance unless a string `testPrompterParams` is given
 * (passed to URLSearchParams, usually provided by a TEST_PROMPTER_X environment
 * variable), in which case a passthrough promise that resolves to a simulated
 * answer object based on `testPrompterParams` is returned as the resolved
 * result of calling `prompt()` instead.
 */
const getPrompter = (testPrompterParams?: string): { prompt: PromptModule } => {
  return testPrompterParams
    ? {
        prompt: (() => {
          debug(
            `using simulated inquirer prompt based on params: ${testPrompterParams}`
          );

          return Promise.resolve(
            Object.fromEntries(
              Array.from(new URLSearchParams(testPrompterParams).entries())
            )
          );
        }) as unknown as PromptModule
      }
    : inquirer;
};

/**
 * Sets up a database from scratch by creating collections (only if they do
 * not already exist) and populating them with a large amount of data. Suitable
 * for initializing local machines or production instances alike.
 *
 * This function is data-preserving (all actions are non-destructive: data is
 * never overwritten or deleted)
 */
const invoked = async () => {
  try {
    const answers = await getPrompter(process.env.TEST_PROMPTER_INITIALIZER).prompt<{
      action: string;
      token: string;
    }>([
      {
        name: 'action',
        message: 'select an initializer action',
        type: 'list',
        choices: [
          {
            name: 'commit initial state to database',
            value: 'commit'
          },
          {
            name: 'commit initial state to database (force)',
            value: 'commit-force'
          },
          { name: 'exit', value: 'exit' }
        ]
      }
    ]);

    switch (answers.action) {
      case 'exit': {
        break;
      }

      case 'commit':
      case 'commit-force': {
        const [, appDb] = await Promise.all([
          getDb({ name: 'root' }),
          getDb({ name: 'app' })
        ]);

        const [electionsDb, ballotsDb] = await Promise.all([
          appDb.collection<InternalElection>('elections'),
          appDb.collection<InternalBallot>('ballots')
        ]);

        const hasNoRecords =
          (await electionsDb.countDocuments()) +
            (await ballotsDb.countDocuments()) ===
          0;

        if (answers.action === 'commit-force' || hasNoRecords) {
          const { MAX_BALLOTS_PER_ELECTION, MAX_VOTERID_LENGTH } = getEnv();

          const elections = Array.from({
            length: faker.helpers.rangeToNumber({ min: 900, max: 1000 })
          }).map((_, index) => {
            const createdAt = faker.helpers.rangeToNumber({
              min: Date.now() - 10 ** 9,
              max: Date.now() + (index % 5 === 0 ? 10 ** 12 : 0)
            });

            const opensAt = faker.helpers.rangeToNumber({
              min: createdAt - (index % 15 === 0 ? 10 ** 9 : 0),
              max: createdAt + (index % 3 === 0 ? 10 ** 12 : 1)
            });

            const closesAt = faker.helpers.rangeToNumber({
              min: opensAt + 1,
              max: opensAt + (index % 6 === 0 ? 10 ** 12 : 10 ** 10)
            });

            return {
              __provenance: 'auto-generated',
              _id: new ObjectId(),
              ...getRandomFakeElectionData(),
              createdAt,
              opensAt,
              closesAt,
              deleted: index % 10 === 0
            };
          });

          const ballots = elections.flatMap(({ _id, options }) => {
            if (!options.length) {
              return [];
            }

            return Array.from({
              length: faker.helpers.rangeToNumber({
                min: 0,
                max: MAX_BALLOTS_PER_ELECTION
              })
            }).map((_, ballotIndex) => {
              return {
                __provenance: 'auto-generated',
                _id: new ObjectId(),
                election_id: _id,
                voter_id:
                  faker.internet.userName().slice(0, MAX_VOTERID_LENGTH - 5) +
                  faker.string.numeric(5),
                ranking: Object.fromEntries(
                  faker.helpers
                    .shuffle(
                      options.slice(
                        0,
                        ballotIndex === 0
                          ? // ? The first ballot will always be incomplete
                            faker.helpers.rangeToNumber({
                              min: 1,
                              max: options.length
                            })
                          : options.length
                      )
                    )
                    .map((option, optionIndex) => [option, optionIndex + 1])
                )
              };
            });
          });

          await electionsDb.insertMany(elections);
          await ballotsDb.insertMany(ballots);
        }

        await getPrompter(process.env.TEST_PROMPTER_FINALIZER).prompt<{
          action: string;
          token: string;
        }>([
          {
            name: 'action',
            message: 'what now?',
            type: 'list',
            choices: [{ name: 'exit', value: 'exit' }]
          }
        ]);

        break;
      }
    }

    logOrDebug()('execution complete');
    process.exit(0);
  } catch (error) {
    throw new AppError(`${error}`);
  }
};

export default invoked().catch((error: Error) => {
  log.error(error.message);
  process.exit(2);
});
