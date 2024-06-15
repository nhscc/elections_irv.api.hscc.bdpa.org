[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-item](../README.md) / ItemExistsOptions

# Type alias: ItemExistsOptions

> **ItemExistsOptions**: `object`

Available options for the `itemExists` function.

## Type declaration

### caseInsensitive?

> `optional` **caseInsensitive**: `boolean`

If `true`, ids will be matched in a case-insensitive manner (via locale).

#### Default

```ts
false
```

### excludeId?

> `optional` **excludeId**: [`ItemExistsIdParam`](ItemExistsIdParam.md)

Items matching excludeId will be completely ignored by this function.

#### Default

```ts
undefined
```

### optimisticCoercion?

> `optional` **optimisticCoercion**: `boolean`

When looking for an item matching `{ _id: id }`, where the descriptor key
is the string `"_id"`, `id` will be optimistically wrapped in a `new
ObjectId(id)` call. Set this to `false` to prevent this.

#### Default

```ts
true
```

## Source

[lib/mongo-item/index.ts:17](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L17)
