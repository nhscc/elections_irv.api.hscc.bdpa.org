[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-glue](../README.md) / Middleware

# Type alias: Middleware()\<Options\>

> **Middleware**\<`Options`\>: (`req`, `res`, `context`) => `unknown`

The shape of a custom middleware function.

## Type parameters

• **Options** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

• **context**: [`MiddlewareContext`](MiddlewareContext.md)\<`Options`\>

## Returns

`unknown`

## Source

[lib/next-api-glue/index.ts:14](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-glue/index.ts#L14)
