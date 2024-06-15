[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-adhesive/check-content-type](../README.md) / default

# Function: default()

> **default**(`req`, `res`, `context`): `Promise`\<`void`\>

Rejects requests that are not using an allowed content type. This middleware
should usually come _after_ check-method.

## Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

• **context**: [`MiddlewareContext`](../../../next-api-glue/type-aliases/MiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\>

## Returns

`Promise`\<`void`\>

## Source

[lib/next-adhesive/check-content-type.ts:63](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-adhesive/check-content-type.ts#L63)
