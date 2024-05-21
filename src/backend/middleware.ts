import { middlewareFactory } from 'multiverse/next-api-glue';
import type { Simplify } from 'type-fest';

import logRequest, {
  type Options as LogRequestOptions
} from 'multiverse/next-adhesive/log-request';

import checkVersion, {
  type Options as CheckVersionOptions
} from 'multiverse/next-adhesive/check-version';

import useCors, {
  type Options as UseCorsOptions
} from 'multiverse/next-adhesive/use-cors';

import authRequest, {
  type Options as AuthRequestOptions
} from 'multiverse/next-adhesive/auth-request';

import limitRequest, {
  type Options as LimitRequestOptions
} from 'multiverse/next-adhesive/limit-request';

import checkMethod, {
  type Options as CheckMethodOptions
} from 'multiverse/next-adhesive/check-method';

import checkContentType, {
  type Options as CheckContentTypeOptions
} from 'multiverse/next-adhesive/check-content-type';

import handleError, {
  type Options as HandleErrorOptions
} from 'multiverse/next-adhesive/handle-error';

import contriveError, {
  type Options as ContriveErrorOptions
} from 'multiverse/next-adhesive/contrive-error';

type ExposedOptions = LogRequestOptions &
  CheckVersionOptions &
  CheckMethodOptions &
  CheckContentTypeOptions;

/**
 * The shape of an API endpoint metadata object.
 *
 * This export is heavily relied upon by most of the testing infrastructure and
 * should be exported alongside `defaultEndpointConfig`/`config` in every
 * Next.js API handler file.
 */
export type EndpointMetadata = Simplify<ExposedOptions & { descriptor: string }>;

/**
 * Primary middleware runner for the REST API. Decorates a request handler.
 *
 * Passing `undefined` as `handler` or not calling `res.end()` (and not sending
 * headers) in your handler or use chain will trigger an `HTTP 501 Not
 * Implemented` response. This can be used to to stub out endpoints and their
 * middleware for later implementation.
 */
/* istanbul ignore next */
const withMiddleware = middlewareFactory<
  ExposedOptions &
    UseCorsOptions &
    AuthRequestOptions &
    LimitRequestOptions &
    HandleErrorOptions &
    ContriveErrorOptions
>({
  use: [
    logRequest,
    checkVersion,
    useCors,
    authRequest,
    limitRequest,
    checkMethod,
    checkContentType,
    contriveError
  ],
  useOnError: [handleError],
  options: {
    allowedContentTypes: ['application/json'],
    requiresAuth: true,
    enableContrivedErrors: true
  }
});

/**
 * Middleware runner for the special /sys API endpoints. Decorates a request
 * handler.
 *
 * Passing `undefined` as `handler` or not calling `res.end()` (and not sending
 * headers) in your handler or use chain will trigger an `HTTP 501 Not
 * Implemented` response. This can be used to to stub out endpoints and their
 * middleware for later implementation.
 */
/* istanbul ignore next */
const withSysMiddleware = middlewareFactory<
  LogRequestOptions &
    AuthRequestOptions &
    LimitRequestOptions &
    CheckMethodOptions &
    CheckContentTypeOptions &
    HandleErrorOptions
>({
  use: [logRequest, authRequest, limitRequest, checkMethod, checkContentType],
  useOnError: [handleError],
  options: {
    allowedContentTypes: ['application/json'],
    requiresAuth: { constraints: 'isGlobalAdmin' }
  }
});

export { withMiddleware, withSysMiddleware };
