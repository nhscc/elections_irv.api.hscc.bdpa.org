/* eslint-disable unicorn/filename-case */
import { sendHttpOk } from 'multiverse/next-api-respond';
import { withMiddleware } from 'universe/backend/middleware';

import { deleteElection, getElection, updateElection } from 'universe/backend';
import { authorizationHeaderToOwnerAttribute } from 'universe/backend/api';

// ? This is a NextJS special "config" export
export { defaultConfig as config } from 'universe/backend/api';

export const metadata = {
  descriptor: '/v1/elections/:election_id'
};

export default withMiddleware(
  async (req, res) => {
    const election_id = req.query.election_id?.toString();
    const provenance = await authorizationHeaderToOwnerAttribute(
      req.headers.authorization
    );

    switch (req.method) {
      case 'GET': {
        sendHttpOk(res, { election: await getElection({ election_id, provenance }) });
        break;
      }

      case 'PATCH': {
        await updateElection({ election_id, data: req.body, provenance });
        sendHttpOk(res);
        break;
      }

      case 'DELETE': {
        await deleteElection({ election_id, provenance });
        sendHttpOk(res);
        break;
      }
    }
  },
  {
    descriptor: metadata.descriptor,
    options: { allowedMethods: ['GET', 'PATCH', 'DELETE'], apiVersion: '1' }
  }
);
