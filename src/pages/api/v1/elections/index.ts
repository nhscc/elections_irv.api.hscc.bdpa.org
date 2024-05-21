import { sendHttpOk } from 'multiverse/next-api-respond';
import { createElection, getAllElections } from 'universe/backend';
import { authorizationHeaderToOwnerAttribute } from 'universe/backend/api';
import { withMiddleware } from 'universe/backend/middleware';

// ? This is a NextJS special "config" export
export { defaultConfig as config } from 'universe/backend/api';

export const metadata = {
  descriptor: '/v1/elections'
};

export default withMiddleware(
  async (req, res) => {
    const provenance = await authorizationHeaderToOwnerAttribute(
      req.headers.authorization
    );

    switch (req.method) {
      case 'GET': {
        sendHttpOk(res, {
          elections: await getAllElections({
            after_id: req.query.after?.toString(),
            provenance
          })
        });
        break;
      }

      case 'POST': {
        sendHttpOk(res, {
          election: await createElection({
            data: req.body,
            provenance
          })
        });
        break;
      }
    }
  },
  {
    descriptor: metadata.descriptor,
    options: { allowedMethods: ['GET', 'POST'], apiVersion: '1' }
  }
);
