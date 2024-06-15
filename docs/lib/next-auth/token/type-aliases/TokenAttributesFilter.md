[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / TokenAttributesFilter

# Type alias: TokenAttributesFilter

> **TokenAttributesFilter**: `Partial`\<`object`\>

The shape of a filter used to search through the well-known "auth"
collection.

## Type declaration

### isGlobalAdmin

> **isGlobalAdmin**: `boolean`

The target global administrator status of the target token(s).

### owner

> **owner**: `string` \| `string`[]

As a string, this represents the target _owner_ of the target token. As an
array, this represents the target _owners_ of the target tokens, any of
which could be returned.

## Source

[lib/next-auth/token.ts:105](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L105)
