import { getCommonSchemaConfig } from 'multiverse/mongo-common';
import { getDb, type DbSchema } from 'multiverse/mongo-schema';
import { getEnv } from 'universe/backend/env';

import type { Document, ObjectId, WithId } from 'mongodb';
import type { TokenAttributes } from 'multiverse/next-auth';

/**
 * A JSON representation of the backend Mongo database structure. This is used
 * for consistent app-wide db access across projects and to generate transient
 * versions of the db during testing.
 */
export function getSchemaConfig(): DbSchema {
  return getCommonSchemaConfig({
    databases: {
      'hscc-api-elections_irv': {
        collections: [
          {
            name: 'elections',
            indices: [
              { spec: '__provenance' },
              { spec: 'deleted' },
              { spec: 'opensAt' },
              { spec: 'closesAt' }
            ]
          },
          {
            name: 'ballots',
            indices: [
              { spec: 'election_id' },
              // ! Keys must be in this order when searching to take advantage
              // ! of this index
              { spec: ['voter_id', 'election_id'], options: { unique: true } }
            ]
          }
        ]
      }
    },
    aliases: {
      app: 'hscc-api-elections_irv'
    }
  });
}

/**
 * Return the well-known "elections" collection after calling {@link getDb} on the
 * `'app'` database.
 */
export async function getElectionsDb() {
  return (await getDb({ name: 'app' })).collection<InternalElection>('elections');
}

/**
 * Return the well-known "ballots" collection after calling {@link getDb} on the
 * `'app'` database.
 */
export async function getBallotsDb() {
  return (await getDb({ name: 'app' })).collection<InternalBallot>('ballots');
}

export type TokenAttributeOwner = TokenAttributes['owner'];
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ElectionId extends ObjectId {}
export type VoterId = string;

/**
 * Represents an object that tracks provenance.
 */
export type WithProvenance<T> = {
  __provenance: TokenAttributeOwner;
} & T;

/**
 * The shape of an internal application election.
 */
export type InternalElection = WithProvenance<
  WithId<{
    title: string;
    description: string;
    options: string[];
    createdAt: number;
    opensAt: number;
    closesAt: number;
    deleted: boolean;
  }>
>;

/**
 * The shape of a public application election.
 */
export type PublicElection = Pick<
  InternalElection,
  | 'title'
  | 'description'
  | 'options'
  | 'createdAt'
  | 'opensAt'
  | 'closesAt'
  | 'deleted'
> & {
  owned: boolean;
  election_id: string;
};

/**
 * The shape of a new application election.
 */
export type NewElection = Pick<
  InternalElection,
  'title' | 'description' | 'options' | 'opensAt' | 'closesAt'
>;

/**
 * The shape of a patch application election.
 */
export interface PatchElection extends Partial<NewElection> {}

/**
 * The shape of an internal application election.
 */
export type InternalBallot = WithProvenance<
  WithId<{
    election_id: ElectionId;
    voter_id: VoterId;
    ranking: Record<string, number>;
  }>
>;

/**
 * The shape of a public application ballot.
 */
export type PublicBallot = Pick<InternalBallot, 'voter_id' | 'ranking'>;

/**
 * The shape of a new or patch application ballot.
 */
export type NewOrPatchBallot = Pick<InternalBallot, 'ranking'>;

/**
 * The shape of public info.
 */
export type PublicInfo = {
  upcomingElections: number;
  openElections: number;
  closedElections: number;
};

/**
 * Transforms an internal election into a public election.
 */
export function toPublicElection(
  internalElection: InternalElection,
  { owned }: { owned: boolean }
): PublicElection {
  return {
    election_id: internalElection._id.toString(),
    title: internalElection.title,
    description: internalElection.description,
    options: internalElection.options,
    createdAt: internalElection.createdAt,
    opensAt: internalElection.opensAt,
    closesAt: internalElection.closesAt,
    owned,
    deleted: internalElection.deleted
  };
}

/**
 * Transforms an internal ballot into a public ballot.
 */
export function toPublicBallot(internalBallot: InternalBallot): PublicBallot {
  return {
    voter_id: internalBallot.voter_id.toString(),
    ranking: internalBallot.ranking
  };
}

/**
 * Transforms the internal info data into a publicly consumable info.
 */
export function toPublicInfo({
  closedElections,
  openElections,
  upcomingElections
}: PublicInfo): PublicInfo {
  return {
    upcomingElections,
    openElections,
    closedElections
  };
}

/**
 * A MongoDB cursor projection that transforms an internal election into a public
 * election.
 */
export const incompletePublicElectionProjection = {
  _id: false,
  election_id: { $toString: '$_id' },
  title: true,
  description: true,
  options: true,
  createdAt: true,
  opensAt: true,
  closesAt: true,
  deleted: true
} as const;

/**
 * Returns a MongoDB aggregation pipeline that transforms internal elections
 * into public elections, each including the `owned` property. Prepend a `$match` or
 * similar stage to return only a subset of elections.
 */
export function publicElectionAggregation(
  tokenAttributeOwner: TokenAttributeOwner
): Document[] {
  return [
    // ? LIFO
    { $sort: { _id: -1 } },
    { $limit: getEnv().RESULTS_PER_PAGE },
    { $set: { owned: { $eq: ['$__provenance', tokenAttributeOwner] } } },
    { $project: { ...incompletePublicElectionProjection, owned: true } }
  ];
}

/**
 * A MongoDB cursor projection that transforms an internal ballot into a public
 * ballot.
 */
export const publicBallotProjection = {
  _id: false,
  voter_id: true,
  ranking: true
} as const;
