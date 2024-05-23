import { MongoServerError, ObjectId } from 'mongodb';
import assert from 'node:assert';

import { getEnv } from 'universe/backend/env';

import {
  AppValidationError,
  ErrorMessage,
  ItemNotFoundError,
  NotAuthorizedError,
  ValidationError
} from 'universe/error';

import {
  getBallotsDb,
  getElectionsDb,
  publicBallotProjection,
  publicElectionAggregation,
  toPublicElection,
  toPublicInfo,
  type ElectionId,
  type InternalBallot,
  type InternalElection,
  type PublicBallot,
  type PublicElection,
  type PublicInfo,
  type TokenAttributeOwner
} from 'universe/backend/db';

import {
  validateElectionInvariants,
  validateNewElectionData,
  validateNewOrPatchBallotData,
  validatePatchElectionData,
  validateVoterId
} from 'universe/backend/validators';

import { itemExists, itemToObjectId } from 'multiverse/mongo-item';

export async function getAllElections({
  after_id,
  provenance
}: {
  after_id: string | undefined;
  provenance: TokenAttributeOwner;
}): Promise<PublicElection[]> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  const electionsDb = await getElectionsDb();
  const afterId = after_id ? itemToObjectId<ElectionId>(after_id) : undefined;

  if (afterId && !(await itemExists(electionsDb, afterId))) {
    throw new ItemNotFoundError(after_id, 'after_id');
  }

  return electionsDb
    .aggregate<PublicElection>([
      {
        $match: {
          ...(afterId
            ? {
                _id: {
                  // ? LIFO
                  $lt: afterId
                }
              }
            : {})
        }
      },
      ...publicElectionAggregation(provenance)
    ])
    .toArray();
}

export async function getAllBallotsForElection({
  election_id
}: {
  election_id: string | undefined;
}): Promise<PublicBallot[]> {
  const electionsDb = await getElectionsDb();
  const ballotsDb = await getBallotsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  return ballotsDb
    .find<PublicBallot>(
      { election_id: electionId },
      {
        projection: publicBallotProjection,
        limit: getEnv().RESULTS_PER_PAGE,
        sort: { _id: 1 }
      }
    )
    .toArray();
}

export async function getElection({
  election_id,
  provenance
}: {
  election_id: string | undefined;
  provenance: TokenAttributeOwner;
}): Promise<PublicElection> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  const electionsDb = await getElectionsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  const election = await electionsDb
    .aggregate<PublicElection>([
      { $match: { _id: electionId } },
      ...publicElectionAggregation(provenance)
    ])
    .next();

  if (!election) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  return election;
}

export async function getBallotForElection({
  election_id,
  voter_id
}: {
  election_id: string | undefined;
  voter_id: string | undefined;
}): Promise<PublicBallot> {
  validateVoterId(voter_id);

  const electionsDb = await getElectionsDb();
  const ballotsDb = await getBallotsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  const ballot = await ballotsDb.findOne<PublicBallot>(
    { election_id: electionId, voter_id },
    { projection: publicBallotProjection }
  );

  if (!ballot) {
    throw new ItemNotFoundError(voter_id, 'ballot');
  }

  return ballot;
}

export async function getInfo(): Promise<PublicInfo> {
  const electionsDb = await getElectionsDb();

  const [closedElections, openElections, upcomingElections] = await Promise.all([
    electionsDb.countDocuments({
      deleted: false,
      closesAt: { $lte: Date.now() }
    }),
    electionsDb.countDocuments({
      deleted: false,
      closesAt: { $gt: Date.now() },
      opensAt: { $lte: Date.now() }
    }),
    electionsDb.countDocuments({
      deleted: false,
      opensAt: { $gt: Date.now() }
    })
  ]);

  return toPublicInfo({ closedElections, openElections, upcomingElections });
}

export async function createElection({
  data,
  provenance
}: {
  data: unknown;
  provenance: TokenAttributeOwner;
}): Promise<PublicElection> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  validateNewElectionData(data);
  await validateElectionInvariants(data);

  const createdAt = Date.now();
  const electionsDb = await getElectionsDb();
  const { title, description, options, opensAt, closesAt } = data;

  const newElection: InternalElection = {
    _id: new ObjectId(),
    __provenance: provenance,
    title,
    description,
    options,
    createdAt,
    opensAt,
    closesAt,
    deleted: false
  };

  await electionsDb.insertOne(newElection);
  return toPublicElection(newElection, { owned: true });
}

export async function upsertBallot({
  election_id,
  voter_id,
  data,
  provenance
}: {
  election_id: string | undefined;
  voter_id: string | undefined;
  provenance: TokenAttributeOwner;
  data: unknown;
}): Promise<void> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  validateVoterId(voter_id);
  validateNewOrPatchBallotData(data);

  const electionsDb = await getElectionsDb();
  const ballotsDb = await getBallotsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  if (!(await isProvenant(electionId, provenance))) {
    throw new NotAuthorizedError();
  }

  const { ranking } = data;

  // ? Try an update first
  const { matchedCount } = await ballotsDb.updateOne(
    { voter_id, election_id: electionId },
    { $set: { ranking } }
  );

  /* istanbul ignore else */
  if (matchedCount === 0) {
    // ? Fall back to an insert
    const { MAX_BALLOTS_PER_ELECTION } = getEnv();
    const existingBallotCount = await ballotsDb.countDocuments({
      election_id: electionId
    });

    if (existingBallotCount >= MAX_BALLOTS_PER_ELECTION) {
      throw new ValidationError(
        ErrorMessage.TooMany('ballots', MAX_BALLOTS_PER_ELECTION)
      );
    }

    const newBallot: InternalBallot = {
      _id: new ObjectId(),
      __provenance: provenance,
      voter_id,
      election_id: electionId,
      ranking
    };

    try {
      await ballotsDb.insertOne(newBallot);
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11_000) {
        throw new ValidationError(ErrorMessage.DuplicateFieldValue('voter_id'));
      }

      throw error;
    }
  }

  assert(
    matchedCount === 0 || matchedCount === 1,
    `expected 0 or 1 matched documents, ${matchedCount} were matched`
  );
}

export async function updateElection({
  election_id,
  data,
  provenance
}: {
  election_id: string | undefined;
  provenance: TokenAttributeOwner;
  data: unknown;
}): Promise<void> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  validatePatchElectionData(data);

  const electionsDb = await getElectionsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  if (!(await isProvenant(electionId, provenance))) {
    throw new NotAuthorizedError();
  }

  await validateElectionInvariants({ ...data, _id: electionId });

  const { matchedCount } = await electionsDb.updateOne(
    { _id: electionId },
    {
      $set: Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    }
  );

  if (matchedCount !== 1) {
    throw new ItemNotFoundError(election_id, 'election');
  }
}

export async function deleteElection({
  election_id,
  provenance
}: {
  election_id: string | undefined;
  provenance: TokenAttributeOwner;
}): Promise<void> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  const electionsDb = await getElectionsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  if (!(await isProvenant(electionId, provenance))) {
    throw new NotAuthorizedError();
  }

  const { modifiedCount } = await electionsDb.updateOne(
    { _id: electionId },
    { $set: { deleted: true } }
  );

  assert(
    modifiedCount === 1,
    `expected 1 modified document, ${modifiedCount} were modified`
  );
}

export async function superDeleteElectionAndRelatedBallots({
  election_id
}: {
  election_id: string | undefined;
}): Promise<void> {
  const electionsDb = await getElectionsDb();
  const ballotsDb = await getElectionsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  const { deletedCount } = await electionsDb.deleteOne({ _id: electionId });

  if (deletedCount === 0) {
    throw new ItemNotFoundError(election_id, 'election');
  } else {
    assert(
      deletedCount === 1,
      `expected 1 deleted document, ${deletedCount} were deleted`
    );
  }

  await ballotsDb.deleteMany({ election_id: electionId });
}

export async function deleteBallotFromElection({
  election_id,
  voter_id,
  provenance
}: {
  election_id: string | undefined;
  voter_id: string | undefined;
  provenance: TokenAttributeOwner;
}): Promise<void> {
  if (typeof provenance !== 'string') {
    throw new AppValidationError(ErrorMessage.BadProvenanceToken());
  }

  validateVoterId(voter_id);

  const electionsDb = await getElectionsDb();
  const ballotsDb = await getBallotsDb();

  const electionId = election_id
    ? itemToObjectId<ElectionId>(election_id)
    : undefined;

  if (!electionId || !(await itemExists(electionsDb, electionId))) {
    throw new ItemNotFoundError(election_id, 'election');
  }

  if (!(await isProvenant(electionId, provenance))) {
    throw new NotAuthorizedError();
  }

  const { deletedCount } = await ballotsDb.deleteOne({
    voter_id,
    election_id: electionId
  });

  if (deletedCount === 0) {
    throw new ItemNotFoundError(voter_id, 'ballot');
  } else {
    assert(
      deletedCount === 1,
      `expected 1 deleted document, ${deletedCount} were deleted`
    );
  }
}

/**
 * Returns `true` if the given `provenance` matches the election's
 * `__provenance` property, which implies that the current user is authorized to
 * mutate the associated resource.
 */
async function isProvenant(electionId: ElectionId, provenance: TokenAttributeOwner) {
  const electionsDb = await getElectionsDb();
  return !!(await electionsDb.findOne({
    _id: electionId,
    __provenance: provenance
  }));
}
