[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / deleteTokensByAttribute

# Function: deleteTokensByAttribute()

> **deleteTokensByAttribute**(`__namedParameters`): `Promise`\<`number`\>

Deletes all full token entries with matching attributes in the well-known
"auth" MongoDB collection. Throws if an attempt is made to delete entries
with an empty filter.

Deleted tokens remain in the system but in a deactivated state. They cannot
be reactivated or otherwise interacted with after they are
deleted/deactivated.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.filter**: [`LiteralUnknownUnion`](../../../../types/global/type-aliases/LiteralUnknownUnion.md)\<`Partial`\<`object`\>\>

## Returns

`Promise`\<`number`\>

## Source

[lib/next-auth/token.ts:649](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L649)
