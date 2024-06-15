[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-schema](../README.md) / CollectionSchema

# Type alias: CollectionSchema

> **CollectionSchema**: `object`

A configuration object representing a MongoDB collection.

## Type declaration

### createOptions?

> `optional` **createOptions**: `Parameters`\<`Db`\[`"createCollection"`\]\>\[`1`\]

An object passed directly to the MongoDB `createCollection` function via
the `createOptions` parameter.

### indices?

> `optional` **indices**: `object`[]

An object representing indices to be created on the MongoDB collection via
`createIndex`.

### name

> **name**: `string`

The valid MongoDB name of the collection.

## Source

[lib/mongo-schema/index.ts:37](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-schema/index.ts#L37)
