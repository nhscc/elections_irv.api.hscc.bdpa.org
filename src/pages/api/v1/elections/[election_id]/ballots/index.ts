import { sendHttpOk } from 'multiverse/next-api-respond';
import { getAllBallotsForElection } from 'universe/backend';
import { withMiddleware } from 'universe/backend/middleware';

// ? This is a NextJS special "config" export
export { defaultConfig as config } from 'universe/backend/api';

export const metadata = {
  descriptor: '/v1/elections'
};

export default withMiddleware(
  async (req, res) => {
    switch (req.method) {
      case 'GET': {
        sendHttpOk(res, {
          ballots: await getAllBallotsForElection({
            election_id: req.query.election_id?.toString()
          })
        });
        break;
      }
    }
  },
  {
    descriptor: metadata.descriptor,
    options: { allowedMethods: ['GET'], apiVersion: '1' }
  }
);
