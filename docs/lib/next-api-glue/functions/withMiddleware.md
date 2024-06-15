[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-glue](../README.md) / withMiddleware

# Function: withMiddleware()

> **withMiddleware**\<`Options`\>(`pagesHandler`, `__namedParameters`): (`req`, `res`) => `Promise`\<`void`\>

Generic middleware runner. Decorates a request handler.

Passing `undefined` as `handler` or not calling `res.end()` (and not sending
headers) in your handler or use chain will trigger an `HTTP 501 Not
Implemented` response. This can be used to to stub out endpoints and their
middleware for later implementation.

## Type parameters

• **Options** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

• **pagesHandler**: `undefined` \| `NextApiHandler`

• **\_\_namedParameters**

• **\_\_namedParameters.descriptor**: `undefined` \| `string`

• **\_\_namedParameters.options?**: `Partial`\<`NoInfer`\<`Options`\> & `object`\> & `NoInfer`\<`Options`\>

• **\_\_namedParameters.use**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

• **\_\_namedParameters.useOnError?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

## Returns

`Function`

### Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

### Returns

`Promise`\<`void`\>

## Source

[lib/next-api-glue/index.ts:95](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-glue/index.ts#L95)
