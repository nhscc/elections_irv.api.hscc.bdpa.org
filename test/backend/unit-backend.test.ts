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
  getSchemaConfig,
  toPublicBallot,
  toPublicElection,
  toPublicInfo,
  type ElectionId,
  type InternalBallot,
  type InternalElection,
  type NewElection,
  type NewOrPatchBallot,
  type PatchElection,
  type PublicBallot,
  type PublicElection,
  type PublicInfo,
  type VoterId
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

  it('rejects if after_id not found', async () => {
    expect.hasAssertions();

    const after_id = new ObjectId().toString();

    await expect(
      Backend.getAllElections({ after_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(after_id, 'after_id')
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

  it('rejects if election_id not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.getAllBallotsForElection({ election_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
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

  it('rejects if election_id is not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();

    await expect(
      Backend.getElection({ election_id, provenance })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
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

  it('rejects if election_id is not found', async () => {
    expect.hasAssertions();

    const election_id = new ObjectId().toString();
    const voter_id = dummyAppData.ballots[0].voter_id;

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(election_id, 'election')
    });
  });

  it('rejects if voter_id is not found', async () => {
    expect.hasAssertions();

    const election_id = itemToStringId(dummyAppData.elections[1]);
    const voter_id = 'fake';

    await expect(
      Backend.getBallotForElection({ election_id, voter_id })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(voter_id, 'ballot')
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

  it('rejects if new election would violate the invariant: opensAt < closedAt', async () => {
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

  it('rejects when attempting to create an election with duplicate options', async () => {
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

  it('rejects if ranking is empty', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        election_id: itemToStringId(dummyAppData.elections[0]),
        data: { ranking: {} },
        voter_id: 'fake-id',
        provenance
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidLength(
        'ranking',
        0,
        1,
        getEnv().MAX_ELECTION_OPTIONS_ITEMS
      )
    });
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

  it('rejects if data is invalid or contains properties that violate limits', async () => {
    expect.hasAssertions();

    const fake_id = itemToStringId(new ObjectId());

    const {
      MAX_OPPORTUNITY_CONTENTS_LENGTH_BYTES: maxContentLength,
      MAX_OPPORTUNITY_TITLE_LENGTH: maxTitleLength
    } = getEnv();

    const newOpportunities: [
      Parameters<typeof Backend.upsertBallot>[0]['data'],
      string
    ][] = [
      [undefined, ErrorMessage.InvalidJSON()],
      ['string data', ErrorMessage.InvalidJSON()],
      [
        {} as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('contents', 0, maxContentLength, 'bytes')
      ],
      [
        { contents: null } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('contents', 0, maxContentLength, 'bytes')
      ],
      [
        { contents: false } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('contents', 0, maxContentLength, 'bytes')
      ],
      [
        { contents: 'x'.repeat(maxContentLength + 1) } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('contents', 0, maxContentLength, 'bytes')
      ],
      [
        { contents: 'x'.repeat(maxContentLength) } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('title', 1, maxTitleLength, 'string')
      ],
      [
        { contents: 'x', title: '' } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('title', 1, maxTitleLength, 'string')
      ],
      [
        { contents: 'x', title: 5 } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('title', 1, maxTitleLength, 'string')
      ],
      [
        { contents: 'x', title: null } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('title', 1, maxTitleLength, 'string')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength + 1)
        } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidStringLength('title', 1, maxTitleLength, 'string')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength)
        } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidFieldValue('creator_id')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength),
          creator_id: null
        } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidFieldValue('creator_id')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength),
          creator_id: 5
        } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidFieldValue('creator_id')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength),
          creator_id: 'bad'
        } as unknown as NewOrPatchBallot,
        ErrorMessage.InvalidObjectId('bad')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength),
          creator_id: fake_id
        } as unknown as NewOrPatchBallot,
        ErrorMessage.ItemNotFound(fake_id, 'user')
      ],
      [
        {
          contents: 'x',
          title: 'x'.repeat(maxTitleLength),
          creator_id: itemToStringId(dummyAppData.users[0]),
          type: 'administrator'
        } as NewOrPatchBallot,
        ErrorMessage.UnknownField('type')
      ]
    ];

    await expectExceptionsWithMatchingErrors(newOpportunities, (data) =>
      Backend.upsertBallot({ apiVersion: 1, data, __provenance: 'fake-owner' })
    );

    await expectExceptionsWithMatchingErrors(newOpportunities, (data) =>
      Backend.upsertBallot({ apiVersion: 2, data, __provenance: 'fake-owner' })
    );
  });
});

describe('::updateElection', () => {
  it('updates an existing election', async () => {
    expect.hasAssertions();

    const usersDb = await getUsersDb();
    const userId = itemToObjectId(dummyAppData.users[2]);
    const patchUser: PatchUser = { type: 'staff' };

    await expect(
      usersDb.countDocuments({
        _id: userId,
        ...patchUser
      })
    ).resolves.toBe(0);

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: itemToStringId(userId),
        data: patchUser
      })
    ).resolves.toBeUndefined();

    await expect(
      usersDb.countDocuments({
        _id: userId,
        ...patchUser
      })
    ).resolves.toBe(1);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if update would violate the invariant: opensAt < closedAt', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if no data passed in', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: itemToStringId(dummyAppData.users[0]),
        data: {}
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.EmptyJSONBody()
    });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: undefined,
        data: { email: 'fake@email.com' }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('user_id', 'parameter')
    });

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: 'bad',
        data: { email: 'fake@email.com' }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('bad')
    });

    const user_id = itemToStringId(new ObjectId());

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id,
        data: { email: 'fake@email.com' }
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(user_id, 'user')
    });
  });

  it('rejects when attempting to update an election to have duplicate options', async () => {
    expect.hasAssertions();

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: itemToStringId(dummyAppData.users[1]),
        data: { email: dummyAppData.users[0].email }
      })
    ).rejects.toMatchObject({ message: ErrorMessage.DuplicateFieldValue('email') });

    await expect(
      Backend.updateUser({
        apiVersion: 1,
        user_id: itemToStringId(dummyAppData.users[1]),
        data: { email: dummyAppData.users[1].email }
      })
    ).resolves.toBeUndefined();
  });

  it('rejects if data is invalid or contains properties that violate limits', async () => {
    expect.hasAssertions();

    const {
      MIN_USER_EMAIL_LENGTH: minELength,
      MAX_USER_EMAIL_LENGTH: maxELength,
      USER_SALT_LENGTH: saltLength,
      USER_KEY_LENGTH: keyLength,
      MAX_SECTION_DESCRIPTION_LENGTH: maxDescLength,
      MAX_SECTION_LOCATION_LENGTH: maxLocationLength,
      MAX_SECTION_TITLE_LENGTH: maxTitleLength,
      MAX_USER_SECTION_ITEMS: maxSectionItems,
      MAX_USER_ABOUT_SECTION_LENGTH_BYTES: maxAboutLength,
      MAX_USER_SKILLS_SECTION_ITEMS: maxSkills,
      MAX_USER_SKILLS_SECTION_ITEM_LENGTH: maxSkillLength
    } = getEnv();

    const patchUsers: [Parameters<typeof Backend.updateUser>[0]['data'], string][] = [
      [undefined as unknown as PatchUser, ErrorMessage.InvalidJSON()],
      ['string data' as PatchUser, ErrorMessage.InvalidJSON()],
      [
        { email: '' },
        ErrorMessage.InvalidStringLength(
          'email',
          minELength,
          maxELength,
          'valid email address'
        )
      ],
      [
        { email: 'x'.repeat(minELength - 1) },
        ErrorMessage.InvalidStringLength(
          'email',
          minELength,
          maxELength,
          'valid email address'
        )
      ],
      [
        { email: 'x'.repeat(maxELength + 1) },
        ErrorMessage.InvalidStringLength(
          'email',
          minELength,
          maxELength,
          'valid email address'
        )
      ],
      [
        { email: 'x'.repeat(maxELength) },
        ErrorMessage.InvalidStringLength(
          'email',
          minELength,
          maxELength,
          'valid email address'
        )
      ],
      [
        { salt: '' },
        ErrorMessage.InvalidStringLength('salt', saltLength, null, 'hexadecimal')
      ],
      [
        { salt: '0'.repeat(saltLength - 1) },
        ErrorMessage.InvalidStringLength('salt', saltLength, null, 'hexadecimal')
      ],
      [
        { salt: 'x'.repeat(saltLength) },
        ErrorMessage.InvalidStringLength('salt', saltLength, null, 'hexadecimal')
      ],
      [
        { key: '' },
        ErrorMessage.InvalidStringLength('key', keyLength, null, 'hexadecimal')
      ],
      [
        { key: '0'.repeat(keyLength - 1) },
        ErrorMessage.InvalidStringLength('key', keyLength, null, 'hexadecimal')
      ],
      [
        // * Not hexadecimal
        { key: 'x'.repeat(keyLength) },
        ErrorMessage.InvalidStringLength('key', keyLength, null, 'hexadecimal')
      ],
      // * Key must always be paired with salt and vice-versa
      [
        { key: 'a'.repeat(keyLength) },
        ErrorMessage.InvalidStringLength('salt', saltLength, null, 'hexadecimal')
      ],
      // * Key must always be paired with salt and vice-versa
      [
        { salt: 'a'.repeat(saltLength) },
        ErrorMessage.InvalidStringLength('key', keyLength, null, 'hexadecimal')
      ],
      [
        { views: null },
        ErrorMessage.InvalidFieldValue('views', 'null', ['increment'])
      ],
      [{ views: 5 }, ErrorMessage.InvalidFieldValue('views', '5', ['increment'])],
      [{ views: '+1' }, ErrorMessage.InvalidFieldValue('views', '+1', ['increment'])],
      [
        { views: 'decrement' },
        ErrorMessage.InvalidFieldValue('views', 'decrement', ['increment'])
      ],
      [
        { type: 'blogger' },
        ErrorMessage.InvalidFieldValue('type', 'blogger', userTypes)
      ],
      [{ type: null }, ErrorMessage.InvalidFieldValue('type', 'null', userTypes)],
      [{ sections: null }, ErrorMessage.InvalidFieldValue('sections')],
      [{ sections: [] }, ErrorMessage.InvalidFieldValue('sections')],
      [
        { sections: { about: true } },
        ErrorMessage.InvalidStringLength('sections.about', 0, maxAboutLength, 'bytes')
      ],
      [
        { sections: { about: 5 } },
        ErrorMessage.InvalidStringLength('sections.about', 0, maxAboutLength, 'bytes')
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength + 1),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength),
                startedAt: mockDateNowMs,
                endedAt: null
              }
            ]
          }
        },
        ErrorMessage.InvalidStringLength(
          'sections.education[0].title',
          1,
          maxTitleLength,
          'string'
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength + 1),
                location: 'e'.repeat(maxLocationLength),
                startedAt: mockDateNowMs,
                endedAt: null
              }
            ]
          }
        },
        ErrorMessage.InvalidStringLength(
          'sections.education[0].description',
          1,
          maxDescLength,
          'string'
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength + 1),
                startedAt: mockDateNowMs,
                endedAt: null
              }
            ]
          }
        },
        ErrorMessage.InvalidStringLength(
          'sections.education[0].location',
          1,
          maxLocationLength,
          'string'
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength),
                startedAt: null,
                endedAt: mockDateNowMs
              }
            ]
          }
        },
        ErrorMessage.InvalidNumberValue(
          'sections.education[0].startedAt',
          1,
          Number.MAX_SAFE_INTEGER,
          'integer'
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength),
                startedAt: -1,
                endedAt: -1
              }
            ]
          }
        },
        ErrorMessage.InvalidNumberValue(
          'sections.education[0].startedAt',
          1,
          Number.MAX_SAFE_INTEGER,
          'integer'
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength),
                startedAt: mockDateNowMs,
                endedAt: -1
              }
            ]
          }
        },
        ErrorMessage.InvalidNumberValue(
          'sections.education[0].endedAt',
          mockDateNowMs,
          Number.MAX_SAFE_INTEGER,
          'integer',
          true
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: [
              {
                title: 'e'.repeat(maxTitleLength),
                description: 'e'.repeat(maxDescLength),
                location: 'e'.repeat(maxLocationLength),
                startedAt: mockDateNowMs,
                endedAt: mockDateNowMs - 1
              }
            ]
          }
        },
        ErrorMessage.InvalidNumberValue(
          'sections.education[0].endedAt',
          mockDateNowMs,
          Number.MAX_SAFE_INTEGER,
          'integer',
          true
        )
      ],
      [
        {
          sections: {
            about: 'something',
            education: Array.from({ length: maxSectionItems + 1 }).map((_, index) => {
              return {
                title: `${index}`,
                description: `${index}`,
                location: `${index}`,
                startedAt: mockDateNowMs,
                endedAt: mockDateNowMs
              };
            })
          }
        },
        ErrorMessage.TooMany(`sections.education items`, maxSectionItems)
      ],
      [
        {
          sections: {
            about: 'something',
            skills: Array.from({ length: maxSkills + 1 }).map((_, index) =>
              `${index}`.repeat(maxSkillLength)
            )
          }
        },
        ErrorMessage.TooMany('skills', maxSkills)
      ],
      [
        {
          sections: { about: 'something', skills: ['x'.repeat(maxSkillLength + 1)] }
        },
        ErrorMessage.InvalidArrayValue(
          'sections.skills',
          'x'.repeat(maxSkillLength + 1),
          0
        )
      ],
      [{ banned: 'true' as unknown as boolean }, ErrorMessage.UnknownField('banned')],
      [{ banned: null as unknown as boolean }, ErrorMessage.UnknownField('banned')],
      [{ data: 1 } as PatchUser, ErrorMessage.UnknownField('data')],
      [
        { blogName: 'new-blog-name' } as PatchUser,
        ErrorMessage.UnknownField('blogName')
      ],
      [{ name: 'username' } as PatchUser, ErrorMessage.UnknownField('name')],
      [
        {
          email: 'valid@email.address',
          salt: '0'.repeat(saltLength),
          key: '0'.repeat(keyLength),
          username: 'new-username'
        } as PatchUser,
        ErrorMessage.UnknownField('username')
      ]
    ];

    await expectExceptionsWithMatchingErrors(patchUsers, (data) => {
      return Backend.updateUser({
        apiVersion: 1,
        user_id: dummyAppData.users[0].username,
        data
      });
    });

    await expectExceptionsWithMatchingErrors(patchUsers, (data) => {
      return Backend.updateUser({
        apiVersion: 2,
        user_id: dummyAppData.users[0].username,
        data
      });
    });
  });
});

describe('::deleteElection', () => {
  it('soft deletes an election', async () => {
    expect.hasAssertions();

    const usersDb = await getUsersDb();

    await expect(
      usersDb.countDocuments({ _id: itemToObjectId(dummyAppData.users[0]) })
    ).resolves.toBe(1);

    await expect(
      Backend.deleteUser({ user_id: itemToStringId(dummyAppData.users[0]) })
    ).resolves.toBeUndefined();

    await expect(
      usersDb.countDocuments({ _id: itemToObjectId(dummyAppData.users[0]) })
    ).resolves.toBe(0);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteUser({ user_id: 'does-not-exist' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(Backend.deleteUser({ user_id: undefined })).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('user_id', 'parameter')
    });

    const user_id = itemToStringId(new ObjectId());
    await expect(Backend.deleteUser({ user_id })).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(user_id, 'user')
    });
  });
});

describe('::deleteBallotFromElection', () => {
  it('deletes an article by article_id', async () => {
    expect.hasAssertions();

    const articlesDb = await getArticlesDb();

    await expect(
      articlesDb.countDocuments({
        _id: itemToObjectId(dummyAppData.articles[0])
      })
    ).resolves.toBe(1);

    await expect(
      Backend.deleteArticle({
        article_id: itemToStringId(dummyAppData.articles[0])
      })
    ).resolves.toBeUndefined();

    await expect(
      articlesDb.countDocuments({
        _id: itemToObjectId(dummyAppData.articles[0])
      })
    ).resolves.toBe(0);
  });

  it('rejects on provenance mismatch', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if provenance is not a string', async () => {
    expect.hasAssertions();

    await expect(
      Backend.upsertBallot({
        apiVersion: 1,
        data: {
          title: 'new opportunity',
          contents: '',
          creator_id: itemToStringId(dummyAppData.users[0])
        },
        __provenance: undefined as unknown as string
      })
    ).rejects.toMatchObject({
      message: ErrorMessage.BadProvenanceToken()
    });
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteArticle({ article_id: 'does-not-exist' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(
      Backend.deleteArticle({ article_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('article_id', 'parameter')
    });

    const article_id = itemToStringId(new ObjectId());
    await expect(Backend.deleteArticle({ article_id })).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(article_id, 'article')
    });
  });

  it('rejects if the voter_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteArticle({ article_id: 'does-not-exist' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(
      Backend.deleteArticle({ article_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('article_id', 'parameter')
    });

    const article_id = itemToStringId(new ObjectId());
    await expect(Backend.deleteArticle({ article_id })).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(article_id, 'article')
    });
  });

  it('rejects if the voter_id and election_id are defined but do not form a valid composite key', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteArticle({ article_id: 'does-not-exist' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(
      Backend.deleteArticle({ article_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('article_id', 'parameter')
    });

    const article_id = itemToStringId(new ObjectId());
    await expect(Backend.deleteArticle({ article_id })).rejects.toMatchObject({
      message: ErrorMessage.ItemNotFound(article_id, 'article')
    });
  });
});

describe('::superDeleteElectionAndRelatedBallots', () => {
  it('permanently deletes an election and all its ballots', async () => {
    expect.hasAssertions();

    const opportunitiesDb = await getOpportunitiesDb();

    await expect(
      opportunitiesDb.countDocuments({
        _id: itemToObjectId(dummyAppData.opportunities[0])
      })
    ).resolves.toBe(1);

    await expect(
      Backend.deleteOpportunity({
        opportunity_id: itemToStringId(dummyAppData.opportunities[0])
      })
    ).resolves.toBeUndefined();

    await expect(
      opportunitiesDb.countDocuments({
        _id: itemToObjectId(dummyAppData.opportunities[0])
      })
    ).resolves.toBe(0);
  });

  it('rejects if the election_id is undefined, invalid, or not found', async () => {
    expect.hasAssertions();

    await expect(
      Backend.deleteOpportunity({ opportunity_id: 'does-not-exist' })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidObjectId('does-not-exist')
    });

    await expect(
      Backend.deleteOpportunity({ opportunity_id: undefined })
    ).rejects.toMatchObject({
      message: ErrorMessage.InvalidItem('opportunity_id', 'parameter')
    });

    const opportunity_id = itemToStringId(new ObjectId());
    await expect(Backend.deleteOpportunity({ opportunity_id })).rejects.toMatchObject(
      {
        message: ErrorMessage.ItemNotFound(opportunity_id, 'opportunity')
      }
    );
  });
});
