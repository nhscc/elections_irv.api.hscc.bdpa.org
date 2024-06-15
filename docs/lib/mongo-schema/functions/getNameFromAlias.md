[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-schema](../README.md) / getNameFromAlias

# Function: getNameFromAlias()

> **getNameFromAlias**(`alias`): `Promise`\<`string`\>

Accepts a database alias (or real name) and returns its real name. If the
actual database is not listed in the schema, an error is thrown.

## Parameters

• **alias**: `string`

## Returns

`Promise`\<`string`\>

## Source

[lib/mongo-schema/index.ts:162](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-schema/index.ts#L162)
