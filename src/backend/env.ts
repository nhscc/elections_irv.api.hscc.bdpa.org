import { parse as parseAsBytes } from 'bytes';
import { getEnv as getDefaultEnv } from 'multiverse/next-env';
import { InvalidAppEnvironmentError } from 'universe/error';

import type { Environment } from 'multiverse/next-env';

// TODO: replace validation logic with zod instead (including defaults) and
// TODO: integrate that logic with expect-env (also zod-based)

// TODO: fix the badness that happens when trying to reference a non-existent
// TODO: key from getEnv() (right now it says something like Primitive |
// TODO: Primitive[] when it should be never)

/**
 * Returns an object representing the application's runtime environment.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getEnv<T extends Environment = Environment>() {
  const env = getDefaultEnv({
    MAX_PARAMS_PER_REQUEST: Number(process.env.MAX_PARAMS_PER_REQUEST) || 100,
    MIN_ELECTION_TITLE_LENGTH: Number(process.env.MIN_ELECTION_TITLE_LENGTH) || 4,
    MAX_ELECTION_TITLE_LENGTH: Number(process.env.MAX_ELECTION_TITLE_LENGTH) || 144,
    MAX_ELECTION_DESC_LENGTH: Number(process.env.MAX_ELECTION_DESC_LENGTH) || 200,
    MAX_ELECTION_OPTIONS_ITEMS: Number(process.env.MAX_ELECTION_OPTIONS_ITEMS) || 50,
    MAX_ELECTION_OPTION_LENGTH: Number(process.env.MAX_ELECTION_OPTION_LENGTH) || 60,
    MAX_VOTERID_LENGTH: Number(process.env.MAX_VOTERID_LENGTH) || 24,
    MAX_BALLOTS_PER_ELECTION: Number(process.env.MAX_BALLOTS_PER_ELECTION) || 100,

    PRUNE_DATA_MAX_ELECTIONS_BYTES:
      parseAsBytes(process.env.PRUNE_DATA_MAX_ELECTIONS_BYTES ?? '-Infinity') || null,
    PRUNE_DATA_MAX_BALLOTS_BYTES:
      parseAsBytes(process.env.PRUNE_DATA_MAX_BALLOTS_BYTES ?? '-Infinity') || null
  });

  /* istanbul ignore next */
  if (
    (env.NODE_ENV !== 'test' && env.OVERRIDE_EXPECT_ENV !== 'force-no-check') ||
    env.OVERRIDE_EXPECT_ENV === 'force-check'
  ) {
    const errors: string[] = [];

    (
      [
        'MAX_PARAMS_PER_REQUEST',
        'MAX_BALLOTS_PER_ELECTION',
        'MIN_ELECTION_TITLE_LENGTH',
        'MAX_ELECTION_TITLE_LENGTH',
        'MAX_ELECTION_DESC_LENGTH',
        'MAX_ELECTION_OPTIONS_ITEMS',
        'MAX_ELECTION_OPTION_LENGTH',
        'MAX_VOTERID_LENGTH'
      ] as (keyof typeof env)[]
    ).forEach((name) => {
      const value = env[name];
      if (!value || (Number.isSafeInteger(value) && (value as number) <= 0)) {
        errors.push(
          `bad ${name}, saw "${env[name]}" (expected a non-negative number)`
        );
      }
    });

    if (env.MIN_ELECTION_TITLE_LENGTH >= env.MAX_ELECTION_TITLE_LENGTH) {
      errors.push(
        'MIN_ELECTION_TITLE_LENGTH must be strictly less than MAX_ELECTION_TITLE_LENGTH'
      );
    }

    // TODO: make it easier to reuse error code from getDefaultEnv. Or is it
    // TODO: obsoleted by expect-env package? Either way, factor this logic out!
    if (errors.length) {
      throw new InvalidAppEnvironmentError(
        `bad variables:\n - ${errors.join('\n - ')}`
      );
    }
  }

  return env as typeof env & T;
}
