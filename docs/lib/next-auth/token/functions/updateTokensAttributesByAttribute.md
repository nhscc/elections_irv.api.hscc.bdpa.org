[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / updateTokensAttributesByAttribute

# Function: updateTokensAttributesByAttribute()

> **updateTokensAttributesByAttribute**(`__namedParameters`): `Promise`\<`number`\>

Updates all tokens with matching attributes in the well-known "auth" MongoDB
collection.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.filter**: [`LiteralUnknownUnion`](../../../../types/global/type-aliases/LiteralUnknownUnion.md)\<`Partial`\<`object`\>\>

The token attributes used to filter and update tokens.

• **\_\_namedParameters.update**: [`LiteralUnknownUnion`](../../../../types/global/type-aliases/LiteralUnknownUnion.md)\<[`TokenAttributes`](../type-aliases/TokenAttributes.md)\>

The object used to patch the tokens' attributes.

## Returns

`Promise`\<`number`\>

## Source

[lib/next-auth/token.ts:585](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L585)
