/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
import { ObjectId } from 'mongodb';
import assert from 'node:assert';

import * as Backend from 'universe/backend';
import { getEnv } from 'universe/backend/env';
import { ErrorMessage } from 'universe/error';

import {
  getBallotsDb,
  getElectionsDb,
  toPublicBallot,
  toPublicElection,
  toPublicInfo,
  type NewElection,
  type NewOrPatchBallot,
  type PatchElection,
  type PublicElection
} from 'universe/backend/db';

import { expectExceptionsWithMatchingErrors } from 'multiverse/jest-expect-matching-errors';
import { itemToObjectId, itemToStringId } from 'multiverse/mongo-item';
import { setupMemoryServerOverride } from 'multiverse/mongo-test';

import {
  dummyRootData,
  mockDateNowMs,
  useMockDateNow
} from 'multiverse/mongo-common';

import { dummyAppData } from 'testverse/db';
import { mockEnvFactory } from 'testverse/setup';

import type { LiteralUnknownUnion } from 'types/global';

setupMemoryServerOverride();
useMockDateNow();

const withMockedEnv = mockEnvFactory({ NODE_ENV: 'test' });
const provenance = dummyRootData.auth[0].attributes.owner;

describe('::getAllElections', () => {
  it('returns all users in LIFO order', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllElections({
        after_id: undefined,
        provenance
      })
    ).resolves.toStrictEqual(
      dummyAppData.elections
        .toReversed()
        .map((internalElection) =>
          toPublicElection(internalElection, { owned: true })
        )
    );
  });

  it('does not crash when database is empty', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllElections({
        after_id: undefined,
        provenance
      })
    ).resolves.not.toStrictEqual([]);

    await (await getElectionsDb()).deleteMany({});

    await expect(
      Backend.getAllElections({
        after_id: undefined,
        provenance
      })
    ).resolves.toStrictEqual([]);
  });

  it('supports pagination', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        const expectedResults = dummyAppData.elections
          .toReversed()
          .map((election) => [toPublicElection(election, { owned: true })]);

        assert(expectedResults.length === 6);

        await expect(
          Backend.getAllElections({
            after_id: undefined,
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[0]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[5]),
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[1]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[4]),
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[2]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[3]),
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[3]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[2]),
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[4]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[1]),
            provenance
          })
        ).resolves.toStrictEqual(expectedResults[5]);

        await expect(
          Backend.getAllElections({
            after_id: itemToStringId(dummyAppData.elections[0]),
            provenance
          })
        ).resolves.toStrictEqual([]);
      },
      { RESULTS_PER_PAGE: '1' }
    );
  });

  it('returns owner=false on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllElections({
        after_id: undefined,
        provenance: 'fake'
      })
    ).resolves.toStrictEqual(
      dummyAppData.elections
        .toReversed()
        .map((internalElection) =>
          toPublicElection(internalElection, { owned: false })
        )
    );
  });

  it('rejects if after_id is invalid (undefined is okay)', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllElections({ after_id: 'fake-oid', provenance })
    ).rejects.toMatchObject({ message: ErrorMessage.InvalidObjectId('fake-oid') });
  });

  it('rejects if after_id is invalid or not found', async () => {
    expect.hasAssertions();

    const after_id = new ObjectId().toString();

    await expect(
      Backend.getAllElections({ after_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(after_id, 'after_id')
    });

    await expect(
      Backend.getAllElections({ after_id: 'invalid', provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllElections({
        after_id: undefined,
        provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });
});

describe('::getAllBallotsForElection', () => {
  it('returns all ballots for the given election', async () => {
    expect.hasAssertions();

    {
      const electionId = itemToObjectId(dummyAppData.elections[2]);

      await expect(
        Backend.getAllBallotsForElection({
          election_id: itemToStringId(dummyAppData.elections[2])
        })
      ).resolves.toStrictEqual(
        dummyAppData.ballots
          .filter(({ election_id: _electionId }) => electionId.equals(_electionId))
          .map((ballot) => toPublicBallot(ballot))
      );
    }

    {
      const electionId = itemToObjectId(dummyAppData.elections[3]);

      await expect(
        Backend.getAllBallotsForElection({
          election_id: itemToStringId(dummyAppData.elections[3])
        })
      ).resolves.toStrictEqual(
        dummyAppData.ballots
          .filter(({ election_id: _electionId }) => electionId.equals(_electionId))
          .map((ballot) => toPublicBallot(ballot))
      );
    }
  });

  it('handles election with no votes', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllBallotsForElection({
        election_id: itemToStringId(dummyAppData.elections[0])
      })
    ).resolves.toStrictEqual([]);
  });

  it('does not crash when database is empty', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getAllBallotsForElection({
        election_id: itemToStringId(dummyAppData.elections[2])
      })
    ).resolves.not.toStrictEqual([]);

    await (await getBallotsDb()).deleteMany({});

    await expect(
      Backend.getAllBallotsForElection({
        election_id: itemToStringId(dummyAppData.elections[2])
      })
    ).resolves.toStrictEqual([]);
  });

  it('rejects if election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.getAllBallotsForElection({ election_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });

    await expect(
      Backend.getAllBallotsForElection({ election_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    await expect(
      Backend.getAllBallotsForElection({ election_id: 'invalid' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });
});

describe('::getElection', () => {
  it('returns an election', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[0]);

    await expect(
      Backend.getElection({ election_id, provenance })
    ).resolves.toStrictEqual(
      toPublicElection(dummyAppData.elections[0], { owned: true })
    );
  });

  it('returns owner=false on provenance mismatch', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[0]);

    await expect(
      Backend.getElection({
        election_id,
        provenance: 'fake'
      })
    ).resolves.toStrictEqual(
      toPublicElection(dummyAppData.elections[0], { owned: false })
    );
  });

  it('rejects if election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.getElection({ election_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });

    await expect(
      Backend.getElection({ election_id: undefined, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    await expect(
      Backend.getElection({ election_id: 'invalid', provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.getElection({
        election_id: itemToStringId(dummyAppData.elections[0]),
        provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });
});

describe('::getBallotForElection', () => {
  it('returns a ballot from an election', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[1]);
    const voter_id = dummyAppData.ballots[0].voter_id;

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).resolves.toStrictEqual(toPublicBallot(dummyAppData.ballots[0]));
  });

  it('rejects if election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();
    const voter_id = dummyAppData.ballots[0].voter_id;

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });

    await expect(
      Backend.getBallotForElection({ election_id: undefined, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    await expect(
      Backend.getBallotForElection({ election_id: 'invalid', voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });

  it('rejects if voter_id is undefined or not found', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[1]);
    const voter_id = 'fake';

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(voter_id, 'ballot')
    });

    await expect(
      Backend.getBallotForElection({ election_id, voter_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidStringLength(
        'voter_id',
        1,
        getEnv().MAX_VOTERID_LENGTH,
        'string'
      )
    });
  });

  it('rejects if election_id and voter_id exist but are not a composite key', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[0]);
    const voter_id = dummyAppData.ballots[0].voter_id;

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(voter_id, 'ballot')
    });
  });
});

describe('::getInfo', () => {
  it('returns system information wrt apiVersion and only counting active sessions', async () => {
    expect.hasAssertions();

    await expect(Backend.getInfo()).resolves.toStrictEqual(
      toPublicInfo({
        closedElections: dummyAppData.elections.filter(
          ({ deleted, closesAt }) => !deleted && closesAt < mockDateNowMs
        ).length,
        openElections: dummyAppData.elections.filter(
          ({ deleted, opensAt, closesAt }) =>
            !deleted && opensAt < mockDateNowMs && closesAt > mockDateNowMs
        ).length,
        upcomingElections: dummyAppData.elections.filter(
          ({ deleted, opensAt }) => !deleted && opensAt > mockDateNowMs
        ).length
      })
    );
  });
});

describe('::createElection', () => {
  it('creates and returns a new owned election', async () => {
    expect.hasAssertions();

    const newElection: NewElection = {
      title: 'title',
      description: 'description',
      options: ['option-1', 'option-2'],
      opensAt: 0,
      closesAt: 1
    };

    const { title, description, options, opensAt, closesAt } = newElection;

    await expect(
      Backend.createElection({ data: newElection, provenance })
    ).resolves.toStrictEqual<PublicElection>({
      election_id: expect.any(String),
      title,
      description,
      options,
      createdAt: Date.now(),
      opensAt,
      closesAt,
      deleted: false,
      owned: true
    });

    await expect((await getElectionsDb()).countDocuments(newElection)).resolves.toBe(
      1
    );
  });

  it('supports creating elections with empty descriptions and options', async () => {
    expect.hasAssertions();

    const newElection: NewElection = {
      title: 'title',
      description: '',
      options: [],
      opensAt: 0,
      closesAt: 1
    };

    const { title, description, options, opensAt, closesAt } = newElection;

    await expect(
      Backend.createElection({ data: newElection, provenance })
    ).resolves.toStrictEqual<PublicElection>({
      election_id: expect.any(String),
      title,
      description,
      options,
      createdAt: Date.now(),
      opensAt,
      closesAt,
      deleted: false,
      owned: true
    });

    await expect((await getElectionsDb()).countDocuments(newElection)).resolves.toBe(
      1
    );
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.createElection({
        data: {
          title: 'title',
          description: '',
          options: [],
          opensAt: 0,
          closesAt: 1
        },
        provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if new election would violate the invariant: opensAt < closesAt', async () => {
    expect.hasAssertions();

    await expect(
      Backend.createElection({
        provenance,
        data: {
          title: 'title',
          description: '',
          options: [],
          opensAt: 0,
          closesAt: 0
        }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('opensAt < closesAt')
    });

    await expect(
      Backend.createElection({
        provenance,
        data: {
          title: 'title',
          description: '',
          options: [],
          opensAt: 2,
          closesAt: 1
        }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('opensAt < closesAt')
    });
  });

  it('rejects if new election would violate the invariant: options must be unique', async () => {
    expect.hasAssertions();

    await expect(
      Backend.createElection({
        provenance,
        data: {
          title: 'title',
          description: '',
          options: ['1', '1'],
          opensAt: 0,
          closesAt: 1
        }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('options must be unique')
    });
  });

  it('rejects if data is invalid or contains properties that violate limits', async () => {
    expect.hasAssertions();

    const {
      MIN_ELECTION_TITLE_LENGTH: minTitle,
      MAX_ELECTION_TITLE_LENGTH: maxTitle,
      MAX_ELECTION_DESC_LENGTH: maxDesc,
      MAX_ELECTION_OPTIONS_ITEMS: maxOptions,
      MAX_ELECTION_OPTION_LENGTH: maxOption
    } = getEnv();

    const newElections: [LiteralUnknownUnion<NewElection>, string][] = [
      [undefined, ErrorMessage.InvalidJSON()],
      ['string data', ErrorMessage.InvalidJSON()],
      [{}, ErrorMessage.EmptyJSONBody()],
      [
        { email: null },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 1 },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 'x'.repeat(minTitle - 1) },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 'x'.repeat(maxTitle + 1) },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 'x'.repeat(maxTitle) },
        ErrorMessage.InvalidStringLength('description', 0, maxDesc, 'string')
      ],
      [
        { title: 'valid title', description: 1 },
        ErrorMessage.InvalidStringLength('description', 0, maxDesc, 'string')
      ],
      [
        { title: 'valid title', description: 'x'.repeat(maxDesc + 1) },
        ErrorMessage.InvalidStringLength('description', 0, maxDesc, 'string')
      ],
      [
        { title: 'valid title', description: 'x'.repeat(maxDesc) },
        ErrorMessage.InvalidFieldValue('options')
      ],
      [
        { title: 'valid title', description: 'x'.repeat(maxDesc), options: 1 },
        ErrorMessage.InvalidFieldValue('options')
      ],
      [
        {
          title: 'valid title',
          description: '',
          options: ['']
        },
        ErrorMessage.InvalidArrayValue('options', '', 0, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['x'.repeat(maxOption + 1)]
        },
        ErrorMessage.InvalidArrayValue('options', 'x'.repeat(maxOption + 1), 0, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option', '']
        },
        ErrorMessage.InvalidArrayValue('options', '', 1, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        {
          title: 'valid title',
          description: 'x'.repeat(maxDesc),
          options: ('x'.repeat(maxOption) + ',')
            .repeat(maxOptions + 1)
            .split(',')
            .slice(0, -1)
        },
        ErrorMessage.TooMany('options', maxOptions)
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option']
        },
        ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: '1'
        },
        ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: -1
        },
        ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: 0
        },
        ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: 0,
          closesAt: '1'
        },
        ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: 0,
          closesAt: -1
        },
        ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: 0,
          closesAt: 0
        },
        ErrorMessage.InvariantViolation('opensAt < closesAt')
      ],
      [
        {
          title: 'valid title',
          description: 'valid description',
          options: ['valid option'],
          opensAt: 0,
          closesAt: 1,
          extra: true
        },
        ErrorMessage.UnknownField('extra')
      ]
    ];

    await expectExceptionsWithMatchingErrors(newElections, (data) =>
      Backend.createElection({ data, provenance: 'fake-owner' })
    );
  });
});

describe('::upsertBallot', () => {
  it('creates a new ballot if voter_id does not exist', async () => {
    expect.hasAssertions();

    const newBallot: NewOrPatchBallot = {
      ranking: { a: 1, b: 2 }
    };

    const election_id = itemToStringId(dummyAppData.elections[0]);
    const voter_id = 'fake-id';

    await expect(
      Backend.upsertBallot({ election_id, data: newBallot, voter_id, provenance })
    ).resolves.toBeUndefined();

    await expect((await getBallotsDb()).countDocuments(newBallot)).resolves.toBe(1);
  });

  it('updates an existing ballot if voter_id already exists', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[0]);
    const voter_id = 'fake-id';

    const newBallot: NewOrPatchBallot = {
      ranking: { a: 1, b: 2 }
    };

    const updatedBallot: NewOrPatchBallot = {
      ranking: { a: 50, b: 100 }
    };

    await expect(
      Backend.upsertBallot({ election_id, data: newBallot, voter_id, provenance })
    ).resolves.toBeUndefined();

    await expect((await getBallotsDb()).countDocuments(newBallot)).resolves.toBe(1);

    await expect(
      Backend.upsertBallot({ election_id, data: updatedBallot, voter_id, provenance })
    ).resolves.toBeUndefined();

    await expect((await getBallotsDb()).countDocuments(updatedBallot)).resolves.toBe(
      1
    );

    await expect((await getBallotsDb()).countDocuments(newBallot)).resolves.toBe(0);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance: 'fake-provenance'
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.NotAuthorized()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects when attempting to add too many ballots', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        election_id: itemToStringId(dummyAppData.elections[3]),
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.TooMany('ballots', getEnv().MAX_BALLOTS_PER_ELECTION)
    });
  });

  it('rejects if election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.upsertBallot({
        election_id,
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });

    await expect(
      Backend.upsertBallot({
        election_id: undefined,
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    await expect(
      Backend.upsertBallot({
        election_id: 'invalid',
        data: { ranking: { a: 1 } },
        voter_id: 'fake-id',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });

  it('rejects if voter_id is too long or too short', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();
    const { MAX_VOTERID_LENGTH } = getEnv();

    await expect(
      Backend.upsertBallot({
        election_id,
        data: { ranking: { a: 1 } },
        voter_id: 'x'.repeat(MAX_VOTERID_LENGTH + 1),
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidStringLength(
        'voter_id',
        1,
        MAX_VOTERID_LENGTH,
        'string'
      )
    });

    await expect(
      Backend.upsertBallot({
        election_id,
        data: { ranking: { a: 1 } },
        voter_id: '',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidStringLength(
        'voter_id',
        1,
        MAX_VOTERID_LENGTH,
        'string'
      )
    });
  });

  it('rejects if data is invalid or contains properties that violate limits', async () => {
    expect.hasAssertions();

    const {
      MAX_ELECTION_OPTIONS_ITEMS: maxOptions,
      MAX_ELECTION_OPTION_LENGTH: maxOption
    } = getEnv();
    const election_id = itemToStringId(dummyAppData.elections[0]);

    const newOrPatchBallots: [LiteralUnknownUnion<NewOrPatchBallot>, string][] = [
      [undefined, ErrorMessage.InvalidJSON()],
      ['string data', ErrorMessage.InvalidJSON()],
      [{}, ErrorMessage.EmptyJSONBody()],
      [{ contents: null }, ErrorMessage.InvalidJSON('ranking')],
      [{ ranking: 1 }, ErrorMessage.InvalidJSON('ranking')],
      [{ ranking: {} }, ErrorMessage.InvalidLength('ranking', 0, 1, maxOptions)],
      [
        {
          ranking: Object.fromEntries(
            [...dummyAppData.elections[3].options, 'plus one'].map((option) => [
              option,
              1
            ])
          )
        },
        ErrorMessage.InvalidLength('ranking', maxOptions + 1, 1, maxOptions)
      ],
      [
        { ranking: { ['x'.repeat(maxOption + 1)]: 1 } },
        ErrorMessage.InvalidObjectKey('ranking', 'x'.repeat(maxOption + 1), [
          `strings between 1 and ${maxOption} characters`
        ])
      ],
      [
        { ranking: { '': 1 } },
        ErrorMessage.InvalidObjectKey('ranking', '', [
          `strings between 1 and ${maxOption} characters`
        ])
      ],
      [
        { ranking: { x: '1' } },
        ErrorMessage.InvalidObjectKeyValue('ranking', '1', [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: 1.5 } },
        ErrorMessage.InvalidObjectKeyValue('ranking', 1.5, [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: undefined } },
        ErrorMessage.InvalidObjectKeyValue('ranking', undefined, [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: -1 } },
        ErrorMessage.InvalidObjectKeyValue('ranking', -1, [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: Number.NaN } },
        ErrorMessage.InvalidObjectKeyValue('ranking', Number.NaN, [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: Number.POSITIVE_INFINITY } },
        ErrorMessage.InvalidObjectKeyValue('ranking', Number.POSITIVE_INFINITY, [
          `safe non-negative integers`
        ])
      ],
      [
        { ranking: { x: Number.NEGATIVE_INFINITY } },
        ErrorMessage.InvalidObjectKeyValue('ranking', Number.NEGATIVE_INFINITY, [
          `safe non-negative integers`
        ])
      ],
      [{ ranking: { x: 1 }, extra: true }, ErrorMessage.UnknownField('extra')]
    ];

    await expectExceptionsWithMatchingErrors(newOrPatchBallots, (data, index) =>
      Backend.upsertBallot({
        election_id,
        voter_id: index.toString(),
        data,
        provenance: 'fake-owner'
      })
    );
  });
});

describe('::updateElection', () => {
  it('updates an existing election', async () => {
    expect.hasAssertions();

    const electionsDb = await getElectionsDb();
    const electionId = itemToObjectId(dummyAppData.elections[2]);
    const election_id = itemToStringId(dummyAppData.elections[2]);

    const patchElection: PatchElection = {
      title: 'title',
      description: 'description',
      options: ['option-1', 'option-2'],
      opensAt: 0,
      closesAt: 1
    };

    await expect(
      electionsDb.countDocuments({ _id: electionId, ...patchElection })
    ).resolves.toBe(0);

    await expect(
      Backend.updateElection({ election_id, data: patchElection, provenance })
    ).resolves.toBeUndefined();

    await expect(
      electionsDb.countDocuments({ _id: electionId, ...patchElection })
    ).resolves.toBe(1);
  });

  it('supports updating election to empty description and options', async () => {
    expect.hasAssertions();

    const electionsDb = await getElectionsDb();
    const electionId = itemToObjectId(dummyAppData.elections[2]);
    const election_id = itemToStringId(dummyAppData.elections[2]);

    const patchElection: PatchElection = {
      title: '1234',
      description: '',
      options: [],
      opensAt: 0,
      closesAt: 1
    };

    await expect(
      electionsDb.countDocuments({ _id: electionId, ...patchElection })
    ).resolves.toBe(0);

    await expect(
      Backend.updateElection({ election_id, data: patchElection, provenance })
    ).resolves.toBeUndefined();

    await expect(
      electionsDb.countDocuments({ _id: electionId, ...patchElection })
    ).resolves.toBe(1);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateElection({
        provenance: 'fake',
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { title: 'updated election' }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.NotAuthorized()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateElection({
        provenance: undefined as unknown as string,
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { title: 'updated election' }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if update would violate the invariant: opensAt < closesAt', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[2]),
        data: {
          opensAt: 1,
          closesAt: 1
        },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('opensAt < closesAt')
    });

    await expect(
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { opensAt: dummyAppData.elections[0].closesAt },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('opensAt < closesAt')
    });

    await expect(
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[1]),
        data: { closesAt: dummyAppData.elections[1].opensAt },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('opensAt < closesAt')
    });
  });

  it('rejects if new election would violate the invariant: options must be unique', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[1]),
        data: { options: ['bad', 'bad'] },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvariantViolation('options must be unique')
    });
  });

  it('rejects if no data passed in', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[1]),
        data: {},
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.EmptyJSONBody()
    });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.updateElection({
        election_id,
        data: { title: 'updated' },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });

    await expect(
      Backend.updateElection({
        election_id: undefined,
        data: { title: 'updated' },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    await expect(
      Backend.updateElection({
        election_id: 'invalid',
        data: { title: 'updated' },
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });
  });

  it('rejects if data is invalid or contains properties that violate limits', async () => {
    expect.hasAssertions();

    const {
      MIN_ELECTION_TITLE_LENGTH: minTitle,
      MAX_ELECTION_TITLE_LENGTH: maxTitle,
      MAX_ELECTION_DESC_LENGTH: maxDesc,
      MAX_ELECTION_OPTIONS_ITEMS: maxOptions,
      MAX_ELECTION_OPTION_LENGTH: maxOption
    } = getEnv();

    const patchElections: [LiteralUnknownUnion<PatchElection>, string][] = [
      [undefined, ErrorMessage.InvalidJSON()],
      ['string data', ErrorMessage.InvalidJSON()],
      [{}, ErrorMessage.EmptyJSONBody()],
      [{ email: null }, ErrorMessage.UnknownField('email')],
      [
        { title: 1 },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 'x'.repeat(minTitle - 1) },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { title: 'x'.repeat(maxTitle + 1) },
        ErrorMessage.InvalidStringLength('title', minTitle, maxTitle, 'string')
      ],
      [
        { description: 1 },
        ErrorMessage.InvalidStringLength('description', 0, maxDesc, 'string')
      ],
      [
        { description: 'x'.repeat(maxDesc + 1) },
        ErrorMessage.InvalidStringLength('description', 0, maxDesc, 'string')
      ],
      [{ options: 1 }, ErrorMessage.InvalidFieldValue('options')],
      [
        { description: '', options: [''] },
        ErrorMessage.InvalidArrayValue('options', '', 0, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        { options: ['x'.repeat(maxOption + 1)] },
        ErrorMessage.InvalidArrayValue('options', 'x'.repeat(maxOption + 1), 0, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        { options: ['valid option', ''] },
        ErrorMessage.InvalidArrayValue('options', '', 1, [
          `strings of length between 1 and ${maxOption}`
        ])
      ],
      [
        {
          options: ('x'.repeat(maxOption) + ',')
            .repeat(maxOptions + 1)
            .split(',')
            .slice(0, -1)
        },
        ErrorMessage.TooMany('options', maxOptions)
      ],
      [
        { opensAt: '1' },
        ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
      ],
      [
        { opensAt: -1 },
        ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
      ],
      [
        { closesAt: '1' },
        ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
      ],
      [
        { closesAt: -1 },
        ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
      ],
      [
        { opensAt: 0, closesAt: 0 },
        ErrorMessage.InvariantViolation('opensAt < closesAt')
      ]
    ];

    await expectExceptionsWithMatchingErrors(patchElections, (data) =>
      Backend.updateElection({
        election_id: itemToStringId(dummyAppData.elections[0]),
        data,
        provenance
      })
    );
  });
});

describe('::deleteElection', () => {
  it('soft deletes an election', async () => {
    expect.hasAssertions();

    const electionsDb = await getElectionsDb();
    const electionId = itemToObjectId(dummyAppData.elections[0]);

    await expect(
      electionsDb.countDocuments({ _id: electionId, deleted: true })
    ).resolves.toBe(0);

    await expect(
      Backend.deleteElection({ election_id: electionId.toString(), provenance })
    ).resolves.toBeUndefined();

    await expect(
      electionsDb.countDocuments({ _id: electionId, deleted: true })
    ).resolves.toBe(1);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteElection({
        election_id: itemToStringId(dummyAppData.elections[0]),
        provenance: 'fake'
      })
    ).rejects.toMatchObject({ message: ErrorMessage.NotAuthorized() });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteElection({
        election_id: itemToStringId(dummyAppData.elections[0]),
        provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({ message: ErrorMessage.BadProvenanceToken() });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteElection({ election_id: 'invalid', provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });

    await expect(
      Backend.deleteElection({ election_id: undefined, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    const election_id = itemToStringId(new ObjectId());
    await expect(
      Backend.deleteElection({ election_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });
  });
});

describe('::deleteBallotFromElection', () => {
  it('deletes a ballot', async () => {
    expect.hasAssertions();

    const ballotsDb = await getBallotsDb();

    await expect(
      ballotsDb.countDocuments({
        _id: itemToObjectId(dummyAppData.ballots[0])
      })
    ).resolves.toBe(1);

    await expect(
      Backend.deleteBallotFromElection({
        provenance,
        election_id: itemToStringId(dummyAppData.ballots[0].election_id),
        voter_id: dummyAppData.ballots[0].voter_id
      })
    ).resolves.toBeUndefined();

    await expect(
      ballotsDb.countDocuments({
        _id: itemToObjectId(dummyAppData.ballots[0])
      })
    ).resolves.toBe(0);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteBallotFromElection({
        provenance: 'fake',
        election_id: itemToStringId(dummyAppData.ballots[0].election_id),
        voter_id: dummyAppData.ballots[0].voter_id
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.NotAuthorized()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteBallotFromElection({
        provenance: undefined as unknown as string,
        election_id: itemToStringId(dummyAppData.ballots[0].election_id),
        voter_id: dummyAppData.ballots[0].voter_id
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteBallotFromElection({
        provenance,
        election_id: 'does-not-exist',
        voter_id: 'fake'
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(
      Backend.deleteBallotFromElection({
        provenance,
        election_id: undefined,
        voter_id: 'fake'
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    const election_id = itemToStringId(new ObjectId());
    await expect(
      Backend.deleteBallotFromElection({ provenance, election_id, voter_id: 'fake' })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });
  });

  it('rejects if the voter_id is undefined or not found', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.ballots[0].election_id);

    await expect(
      Backend.deleteBallotFromElection({
        provenance,
        election_id,
        voter_id: 'fake'
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound('fake', 'ballot')
    });

    await expect(
      Backend.deleteBallotFromElection({
        provenance,
        election_id,
        voter_id: undefined
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidStringLength(
        'voter_id',
        1,
        getEnv().MAX_VOTERID_LENGTH,
        'string'
      )
    });
  });

  it('rejects if the voter_id and election_id are defined but do not form a valid composite key', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[0]);
    const voter_id = dummyAppData.ballots[0].voter_id;

    await expect(
      Backend.deleteBallotFromElection({ election_id, voter_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(voter_id, 'ballot')
    });
  });
});

describe('::superDeleteElectionAndRelatedBallots', () => {
  it('permanently deletes an election and all its ballots', async () => {
    expect.hasAssertions();

    const electionsDb = await getElectionsDb();
    const electionId = itemToObjectId(dummyAppData.elections[0]);

    await expect(electionsDb.countDocuments({ _id: electionId })).resolves.toBe(1);

    await expect(
      Backend.superDeleteElectionAndRelatedBallots({
        election_id: electionId.toString()
      })
    ).resolves.toBeUndefined();

    await expect(electionsDb.countDocuments({ _id: electionId })).resolves.toBe(0);
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.superDeleteElectionAndRelatedBallots({ election_id: 'invalid' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('invalid')
    });

    await expect(
      Backend.superDeleteElectionAndRelatedBallots({ election_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(undefined, 'election')
    });

    const election_id = itemToStringId(new ObjectId());
    await expect(
      Backend.superDeleteElectionAndRelatedBallots({ election_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });
  });
});
