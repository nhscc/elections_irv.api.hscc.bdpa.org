/* eslint-disable unicorn/filename-case */
import { sendHttpOk } from 'multiverse/next-api-respond';
import { withMiddleware } from 'universe/backend/middleware';

import {
  deleteBallotFromElection,
  getBallotForElection,
  upsertBallot
} from 'universe/backend';
import { authorizationHeaderToOwnerAttribute } from 'universe/backend/api';

// ? This is a NextJS special "config" export
export { defaultConfig as config } from 'universe/backend/api';

export const metadata = {
  descriptor: '/v1/elections/:election_id/ballots/:voter_id'
};

export default withMiddleware(
  async (req, res) => {
    const election_id = req.query.election_id?.toString();
    const voter_id = req.query.voter_id?.toString();
    const provenance = await authorizationHeaderToOwnerAttribute(
      req.headers.authorization
    );

    switch (req.method) {
      case 'GET': {
        sendHttpOk(res, {
          ballot: await getBallotForElection({ election_id, voter_id })
        });
        break;
      }

      case 'PUT': {
        sendHttpOk(res, {
          ballot: await upsertBallot({
            election_id,
            voter_id,
            data: req.body,
            provenance
          })
        });
        break;
      }

      case 'DELETE': {
        await deleteBallotFromElection({ election_id, voter_id, provenance });
        sendHttpOk(res);
        break;
      }
    }
  },
  {
    descriptor: metadata.descriptor,
    options: { allowedMethods: ['GET', 'PUT', 'DELETE'], apiVersion: '1' }
  }
);
