import { asMockedFunction } from '@xunnamius/jest-types';

import {
  createElection,
  deleteBallotFromElection,
  deleteElection,
  getAllBallotsForElection,
  getAllElections,
  getBallotForElection,
  getElection,
  getInfo,
  superDeleteElectionAndRelatedBallots,
  updateElection,
  upsertBallot
} from 'universe/backend';

import CatchAllForNotFoundEndpoint, {
  config as CatchAllForNotFoundConfig,
  metadata as CatchAllForNotFoundMetadata
} from 'universe/pages/api/[[...catchAllForNotFound]]';

import V1EndpointElections, {
  config as V1ConfigElections,
  metadata as V1MetadataElections
} from 'universe/pages/api/v1/elections';

import V1EndpointElectionsElectionId, {
  config as V1ConfigElectionsElectionId,
  metadata as V1MetadataElectionsElectionId
} from 'universe/pages/api/v1/elections/[election_id]';

import V1EndpointElectionsElectionIdBallots, {
  config as V1ConfigElectionsElectionIdBallots,
  metadata as V1MetadataElectionsElectionIdBallots
} from 'universe/pages/api/v1/elections/[election_id]/ballots';

import V1EndpointElectionsElectionIdBallotsVoterId, {
  config as V1ConfigElectionsElectionIdBallotsVoterId,
  metadata as V1MetadataElectionsElectionIdBallotsVoterId
} from 'universe/pages/api/v1/elections/[election_id]/ballots/[voter_id]';

import V1EndpointInfo, {
  config as V1ConfigInfo,
  metadata as V1MetadataInfo
} from 'universe/pages/api/v1/info';

import type { NextApiHandler, PageConfig } from 'next';
import type { PublicBallot, PublicElection, PublicInfo } from 'universe/backend/db';

export type NextApiHandlerMixin = NextApiHandler & {
  config?: PageConfig;
  uri: string;
};

// TODO: make a package that automatically generates/regenerates this file !!!

/**
 * The entire live API topology gathered together into one convenient object.
 */
export const api = {
  catchAllForNotFound: CatchAllForNotFoundEndpoint as NextApiHandlerMixin,
  v1: {
    elections: V1EndpointElections as NextApiHandlerMixin,
    electionsElectionId: V1EndpointElectionsElectionId as NextApiHandlerMixin,
    electionsElectionIdBallots:
      V1EndpointElectionsElectionIdBallots as NextApiHandlerMixin,
    electionsElectionIdBallotsVoterId:
      V1EndpointElectionsElectionIdBallotsVoterId as NextApiHandlerMixin,

    info: V1EndpointInfo as NextApiHandlerMixin
  }
};

// **                           **
// ** Add configuration objects **
// **                           **

api.catchAllForNotFound.config = CatchAllForNotFoundConfig;

api.v1.elections.config = V1ConfigElections;
api.v1.electionsElectionId.config = V1ConfigElectionsElectionId;
api.v1.electionsElectionIdBallots.config = V1ConfigElectionsElectionIdBallots;
api.v1.electionsElectionIdBallotsVoterId.config =
  V1ConfigElectionsElectionIdBallotsVoterId;

api.v1.info.config = V1ConfigInfo;

// **                           **
// ** Add metadata descriptors  **
// **                           **

api.catchAllForNotFound.uri = CatchAllForNotFoundMetadata.descriptor;

api.v1.elections.uri = V1MetadataElections.descriptor;
api.v1.electionsElectionId.uri = V1MetadataElectionsElectionId.descriptor;
api.v1.electionsElectionIdBallots.uri =
  V1MetadataElectionsElectionIdBallots.descriptor;
api.v1.electionsElectionIdBallotsVoterId.uri =
  V1MetadataElectionsElectionIdBallotsVoterId.descriptor;

api.v1.info.uri = V1MetadataInfo.descriptor;

/**
 * A convenience function that mocks the entire backend and returns the mock
 * functions. Uses `beforeEach` under the hood.
 *
 * **WARNING: YOU MUST CALL `jest.mock('universe/backend')` before calling this
 * function!**
 */
export function setupMockBackend() {
  const mockedCreateElection = asMockedFunction(createElection);
  const mockedDeleteBallotFromElection = asMockedFunction(deleteBallotFromElection);
  const mockedDeleteElection = asMockedFunction(deleteElection);
  const mockedGetAllBallotsForElection = asMockedFunction(getAllBallotsForElection);
  const mockedGetAllElections = asMockedFunction(getAllElections);
  const mockedGetBallotForElection = asMockedFunction(getBallotForElection);
  const mockedGetElection = asMockedFunction(getElection);
  const mockedGetInfo = asMockedFunction(getInfo);
  const mockedSuperDeleteElectionAndRelatedBallots = asMockedFunction(
    superDeleteElectionAndRelatedBallots
  );
  const mockedUpdateElection = asMockedFunction(updateElection);
  const mockedUpsertBallot = asMockedFunction(upsertBallot);

  beforeEach(() => {
    mockedCreateElection.mockReturnValue(Promise.resolve({} as PublicElection));
    mockedDeleteBallotFromElection.mockReturnValue(Promise.resolve());
    mockedDeleteElection.mockReturnValue(Promise.resolve());
    mockedGetAllBallotsForElection.mockReturnValue(Promise.resolve([]));
    mockedGetAllElections.mockReturnValue(Promise.resolve([]));
    mockedGetBallotForElection.mockReturnValue(Promise.resolve({} as PublicBallot));
    mockedGetElection.mockReturnValue(Promise.resolve({} as PublicElection));
    mockedGetInfo.mockReturnValue(Promise.resolve({} as PublicInfo));
    mockedSuperDeleteElectionAndRelatedBallots.mockReturnValue(Promise.resolve());
    mockedUpdateElection.mockReturnValue(Promise.resolve());
    mockedUpsertBallot.mockReturnValue(Promise.resolve());
  });

  return {
    mockedCreateElection,
    mockedDeleteBallotFromElection,
    mockedDeleteElection,
    mockedGetAllBallotsForElection,
    mockedGetAllElections,
    mockedGetBallotForElection,
    mockedGetElection,
    mockedGetInfo,
    mockedSuperDeleteElectionAndRelatedBallots,
    mockedUpdateElection,
    mockedUpsertBallot
  };
}
