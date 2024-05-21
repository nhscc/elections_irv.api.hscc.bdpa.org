import { getEnv } from 'universe/backend/env';

import {
  dummyRootData,
  generateMockSensitiveObjectId,
  getCommonDummyData,
  mockDateNowMs
} from 'multiverse/mongo-common';

import type { DummyData } from 'multiverse/mongo-test';

import type { InternalBallot, InternalElection } from 'universe/backend/db';

/**
 * Returns data used to hydrate databases and their collections.
 */
export function getDummyData(): DummyData {
  return getCommonDummyData({ app: dummyAppData });
}

/**
 * The shape of the application database's test data.
 */
export type DummyAppData = {
  _generatedAt: number;
  elections: InternalElection[];
  ballots: InternalBallot[];
};

// ! Tests are relying on the XValue variables remaining what they are ! \\

export const createdAtHighValue = mockDateNowMs;
export const createdAtMidValue = mockDateNowMs - 10 ** 3;
export const createdAtLowValue = mockDateNowMs - 10 ** 5;
export const opensAtHighValue = mockDateNowMs + 10 ** 3;
export const opensAtMidValue = mockDateNowMs - 10 ** 3;
export const opensAtLowValue = mockDateNowMs - 10 ** 5;
export const closesAtHighValue = mockDateNowMs + 10 ** 4;
export const closesAtMidValue = mockDateNowMs - 10 ** 4;
export const closesAtLowValue = mockDateNowMs - 10 ** 6;

// ! Order matters in unit and integration tests, so APPEND ONLY ! \\

const {
  MAX_ELECTION_DESC_LENGTH,
  MAX_ELECTION_OPTIONS_ITEMS,
  MAX_ELECTION_OPTION_LENGTH,
  MAX_ELECTION_TITLE_LENGTH,
  MAX_VOTERID_LENGTH,
  MAX_BALLOTS_PER_ELECTION
} = getEnv();

const elections: InternalElection[] = [
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    // ? Election #1 (empty) demonstrates minimum title length (4 characters)
    title: '#1 E',
    description: '',
    options: [],
    createdAt: createdAtHighValue,
    opensAt: opensAtHighValue,
    closesAt: closesAtHighValue,
    deleted: false
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    title: 'election #2 (deleted)',
    description: 'deleted',
    options: ['deleted-1', 'deleted-2'],
    createdAt: createdAtHighValue,
    opensAt: opensAtHighValue,
    closesAt: closesAtHighValue,
    deleted: true
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    title: 'election #3 (average)',
    description: 'election 3 description',
    options: ['1', '2', '3'],
    createdAt: createdAtHighValue,
    opensAt: opensAtHighValue,
    closesAt: closesAtHighValue,
    deleted: false
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    title: 'election #4 (full) ' + '#'.repeat(MAX_ELECTION_TITLE_LENGTH - 19),
    description: 'x'.repeat(MAX_ELECTION_DESC_LENGTH),
    options: Array.from({ length: MAX_ELECTION_OPTIONS_ITEMS }).map((_, index) =>
      index.toString().repeat(MAX_ELECTION_OPTION_LENGTH)
    ),
    createdAt: createdAtHighValue,
    opensAt: opensAtHighValue,
    closesAt: closesAtHighValue,
    deleted: false
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    title: 'election #5 (open but not closed)',
    description: 'election 5 description',
    options: ['a', 'b', 'c'],
    createdAt: createdAtLowValue,
    opensAt: opensAtMidValue,
    closesAt: closesAtHighValue,
    deleted: false
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    title: 'election #6 (closed)',
    description: 'election 6 description',
    options: ['z-0', 'y-1', 'x-2', 'w-3', 'v-4', 'u-5'],
    createdAt: createdAtHighValue,
    opensAt: opensAtLowValue,
    closesAt: closesAtMidValue,
    deleted: false
  }
];

const ballots: InternalBallot[] = [
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[1]._id,
    voter_id: 'voter_1',
    ranking: { [elections[1].options[0]]: 1, [elections[1].options[1]]: 2 }
  },

  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[2]._id,
    voter_id: 'voter_a',
    ranking: {
      [elections[2].options[0]]: 1,
      [elections[2].options[1]]: 2,
      [elections[2].options[1]]: 3
    }
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[2]._id,
    voter_id: 'voter_b',
    ranking: {
      [elections[2].options[0]]: 2,
      [elections[2].options[1]]: 3,
      [elections[2].options[1]]: 1
    }
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[2]._id,
    voter_id: 'voter_c',
    ranking: {
      [elections[2].options[0]]: 2,
      [elections[2].options[1]]: 1,
      [elections[2].options[2]]: 3
    }
  },

  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[4]._id,
    voter_id: 'voter_x',
    ranking: {
      [elections[4].options[0]]: 1,
      [elections[4].options[1]]: 2,
      [elections[4].options[2]]: 3
    }
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[4]._id,
    voter_id: 'voter_y',
    ranking: {
      [elections[4].options[0]]: 2,
      [elections[4].options[1]]: 3,
      [elections[4].options[2]]: 1
    }
  },

  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[5]._id,
    voter_id: 'voter_x',
    ranking: {
      [elections[5].options[0]]: 1,
      [elections[5].options[1]]: 2,
      [elections[5].options[2]]: 3,
      [elections[5].options[3]]: 4,
      [elections[5].options[4]]: 5
    }
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[5]._id,
    voter_id: 'voter_b',
    ranking: {
      [elections[5].options[0]]: 2,
      [elections[5].options[1]]: 3,
      [elections[5].options[2]]: 1,
      [elections[5].options[3]]: 4,
      [elections[5].options[4]]: 5
    }
  },
  {
    _id: generateMockSensitiveObjectId(),
    __provenance: dummyRootData.auth[0].attributes.owner,
    election_id: elections[5]._id,
    voter_id: 'voter_3',
    ranking: {
      [elections[5].options[2]]: 10,
      [elections[5].options[0]]: 20,
      fake: 50,
      [elections[5].options[1]]: 30
    }
  },

  ...Array.from({ length: MAX_BALLOTS_PER_ELECTION }).map((_, index) => {
    const voterId = `generated_${index}_`;
    return {
      _id: generateMockSensitiveObjectId(),
      __provenance: dummyRootData.auth[0].attributes.owner,
      election_id: elections[3]._id,
      voter_id: `${voterId}${'x'.repeat(MAX_VOTERID_LENGTH - voterId.length)}`,
      ranking: Object.fromEntries(
        elections[3].options.map((option, optionIndex, options) => [
          option,
          index % 2 === 0 ? optionIndex + 1 : options.length - optionIndex
        ])
      )
    } satisfies InternalBallot;
  })
];

/**
 * Test data for the application database.
 */
export const dummyAppData: DummyAppData = {
  _generatedAt: mockDateNowMs,
  elections,
  ballots
};
