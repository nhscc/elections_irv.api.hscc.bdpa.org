[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-common](../README.md) / getCommonSchemaConfig

# Function: getCommonSchemaConfig()

> **getCommonSchemaConfig**(`additionalSchemaConfig`?): [`DbSchema`](../../mongo-schema/type-aliases/DbSchema.md)

A JSON representation of the backend Mongo database structure. This is used
for common consistent "well-known" db structure across projects.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

• **additionalSchemaConfig?**: [`DbSchema`](../../mongo-schema/type-aliases/DbSchema.md)

## Returns

[`DbSchema`](../../mongo-schema/type-aliases/DbSchema.md)

## Source

[lib/mongo-common/index.ts:28](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-common/index.ts#L28)
