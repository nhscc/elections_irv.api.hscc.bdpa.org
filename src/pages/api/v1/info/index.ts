import { sendHttpOk } from 'multiverse/next-api-respond';
import { getInfo } from 'universe/backend';
import { withMiddleware } from 'universe/backend/middleware';

// ? This is a NextJS special "config" export
export { defaultConfig as config } from 'universe/backend/api';

export const metadata = {
  descriptor: '/v1/info'
};

export default withMiddleware(
  async (req, res) => {
    switch (req.method) {
      case 'GET': {
        sendHttpOk(res, { info: await getInfo() });
        break;
      }
    }
  },
  {
    descriptor: metadata.descriptor,
    options: { allowedMethods: ['GET'], apiVersion: '1' }
  }
);
