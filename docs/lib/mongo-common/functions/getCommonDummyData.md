[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-common](../README.md) / getCommonDummyData

# Function: getCommonDummyData()

> **getCommonDummyData**(`additionalDummyData`?): [`DummyData`](../../mongo-test/type-aliases/DummyData.md)

Returns data used to hydrate well-known databases and their well-known
collections.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

• **additionalDummyData?**: [`DummyData`](../../mongo-test/type-aliases/DummyData.md)

## Returns

[`DummyData`](../../mongo-test/type-aliases/DummyData.md)

## Source

[lib/mongo-common/index.ts:88](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-common/index.ts#L88)
