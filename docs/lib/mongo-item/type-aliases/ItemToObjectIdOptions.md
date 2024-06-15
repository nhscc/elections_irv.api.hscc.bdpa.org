[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-item](../README.md) / ItemToObjectIdOptions

# Type alias: ItemToObjectIdOptions

> **ItemToObjectIdOptions**: `object`

## Type declaration

### ignoreInvalidId?

> `optional` **ignoreInvalidId**: `boolean`

If `true`, inputs that cannot be coerced into an ObjectId will be
replaced with `null` instead of throwing a [ValidationError](../../../src/error/classes/ValidationError.md).

#### Default

```ts
false
```

## Source

[lib/mongo-item/index.ts:127](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L127)
