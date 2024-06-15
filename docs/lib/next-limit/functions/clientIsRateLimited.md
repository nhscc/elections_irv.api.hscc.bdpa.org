[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-limit](../README.md) / clientIsRateLimited

# Function: clientIsRateLimited()

> **clientIsRateLimited**(`req`): `Promise`\<`object`\>

Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
is true, then the request should be rejected. The client should be instructed
to retry their request after `retryAfter` milliseconds have passed.

## Parameters

• **req**: `NextApiRequest`

## Returns

`Promise`\<`object`\>

### isLimited

> **isLimited**: `boolean` = `!!limited`

### retryAfter

> **retryAfter**: `number`

## Source

[lib/next-limit/index.ts:36](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-limit/index.ts#L36)
