[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-test](../README.md) / TestCustomizations

# Type alias: TestCustomizations

> **TestCustomizations**: `object`

For use when mocking the contents of files containing `getDummyData` and/or
`getSchemaConfig`.

## Type declaration

### getDummyData()

> **getDummyData**: () => `Promise`\<[`DummyData`](DummyData.md)\>

#### Returns

`Promise`\<[`DummyData`](DummyData.md)\>

### getSchemaConfig()

> **getSchemaConfig**: () => `Promise`\<[`DbSchema`](../../mongo-schema/type-aliases/DbSchema.md)\>

#### Returns

`Promise`\<[`DbSchema`](../../mongo-schema/type-aliases/DbSchema.md)\>

## Source

[lib/mongo-test/index.ts:55](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-test/index.ts#L55)
