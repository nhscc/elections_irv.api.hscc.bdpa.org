[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / createToken

# Function: createToken()

> **createToken**(`__namedParameters`): `Promise`\<[`PublicAuthEntry`](../../db/type-aliases/PublicAuthEntry.md)\>

Generates a new full token entry in the well-known "auth" MongoDB collection,
including the provided attribute and scheme metadata. Throws on invalid entry
data.

The current version of this function uses the `bearer` scheme to create v4
UUID "bearer tokens". This _implementation detail_ may change at any time.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.data**: [`LiteralUnknownUnion`](../../../../types/global/type-aliases/LiteralUnknownUnion.md)\<[`NewAuthEntry`](../../db/type-aliases/NewAuthEntry.md)\>

Data used to generate a new "auth" entry.

## Returns

`Promise`\<[`PublicAuthEntry`](../../db/type-aliases/PublicAuthEntry.md)\>

## Source

[lib/next-auth/token.ts:397](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L397)
