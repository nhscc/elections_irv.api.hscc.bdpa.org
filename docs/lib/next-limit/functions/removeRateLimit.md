[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-limit](../README.md) / removeRateLimit

# Function: removeRateLimit()

> **removeRateLimit**(`__namedParameters`): `Promise`\<`number`\>

Removes a rate limit on a client matched against either `ip`, `header`, or
both. Matching against both removes rate limits that match either criterion.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.target**: `undefined` \| `object`

## Returns

`Promise`\<`number`\>

The number of rate limits removed.

## Source

[lib/next-limit/index.ts:69](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-limit/index.ts#L69)
