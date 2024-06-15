[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-schema](../README.md) / getAliasFromName

# Function: getAliasFromName()

> **getAliasFromName**(`nameActual`): `Promise`\<`string`[]\>

Accepts a database name (or an alias) and returns one or more aliases. If the
named database has no aliases listed in the schema, said database name is
returned as a single-element array. If said database name is not listed in
the schema, an error is thrown.

## Parameters

• **nameActual**: `string`

## Returns

`Promise`\<`string`[]\>

## Source

[lib/mongo-schema/index.ts:185](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-schema/index.ts#L185)
