[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [src/backend/middleware](../README.md) / withSysMiddleware

# Function: withSysMiddleware()

> **withSysMiddleware**\<`PassedOptions`\>(`pagesHandler`, `params`): (`req`, `res`) => `Promise`\<`void`\>

Middleware runner for the special /sys API endpoints. Decorates a request
handler.

Passing `undefined` as `handler` or not calling `res.end()` (and not sending
headers) in your handler or use chain will trigger an `HTTP 501 Not
Implemented` response. This can be used to to stub out endpoints and their
middleware for later implementation.

## Type parameters

• **PassedOptions** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

• **pagesHandler**: `undefined` \| `NextApiHandler`

• **params**

• **params.appendUse?**: [`Middleware`](../../../../lib/next-api-glue/type-aliases/Middleware.md)\<[`Options`](../../../../lib/next-adhesive/auth-request/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-method/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-content-type/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/handle-error/type-aliases/Options.md)\>[]

• **params.appendUseOnError?**: [`Middleware`](../../../../lib/next-api-glue/type-aliases/Middleware.md)\<[`Options`](../../../../lib/next-adhesive/auth-request/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-method/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-content-type/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/handle-error/type-aliases/Options.md)\>[]

• **params.descriptor**: `undefined` \| `string`

• **params.options?**: `Partial`\<[`Options`](../../../../lib/next-adhesive/auth-request/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-method/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-content-type/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/handle-error/type-aliases/Options.md) & `object`\> & `NoInfer`\<`PassedOptions`\>

• **params.prependUse?**: [`Middleware`](../../../../lib/next-api-glue/type-aliases/Middleware.md)\<[`Options`](../../../../lib/next-adhesive/auth-request/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-method/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-content-type/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/handle-error/type-aliases/Options.md)\>[]

• **params.prependUseOnError?**: [`Middleware`](../../../../lib/next-api-glue/type-aliases/Middleware.md)\<[`Options`](../../../../lib/next-adhesive/auth-request/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-method/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/check-content-type/type-aliases/Options.md) & [`Options`](../../../../lib/next-adhesive/handle-error/type-aliases/Options.md)\>[]

## Returns

`Function`

### Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

### Returns

`Promise`\<`void`\>

## Source

[src/backend/middleware.ts:99](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/src/backend/middleware.ts#L99)
