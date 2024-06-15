[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-item](../README.md) / itemToObjectId

# Function: itemToObjectId()

## itemToObjectId(item, options)

> **itemToObjectId**\<`T`\>(`item`, `options`): `T` \| `null`

Reduces an `item` down to its `ObjectId` instance.

When `options.ignoreInvalidId` is `true`, result may be `null`.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **item**: [`IdItem`](../type-aliases/IdItem.md)\<`T`\>

• **options**: [`ItemToObjectIdOptions`](../type-aliases/ItemToObjectIdOptions.md) & `object`

### Returns

`T` \| `null`

### Source

[lib/mongo-item/index.ts:142](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L142)

## itemToObjectId(items, options)

> **itemToObjectId**\<`T`\>(`items`, `options`): (`T` \| `null`)[]

Reduces an array of `items` down to their respective `ObjectId` instances.

An attempt is made to eliminate duplicates via `new Set(...)`, but the
absence of duplicates is not guaranteed when `items` contains `WithId<...>`
objects.

When `options.ignoreInvalidId` is `true`, result may contain `null`s.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **items**: [`IdItemArray`](../type-aliases/IdItemArray.md)\<`T`\>

• **options**: [`ItemToObjectIdOptions`](../type-aliases/ItemToObjectIdOptions.md) & `object`

### Returns

(`T` \| `null`)[]

### Source

[lib/mongo-item/index.ts:157](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L157)

## itemToObjectId(item, options)

> **itemToObjectId**\<`T`\>(`item`, `options`?): `T`

Reduces an `item` down to its `ObjectId` instance.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **item**: [`IdItem`](../type-aliases/IdItem.md)\<`T`\>

• **options?**: [`ItemToObjectIdOptions`](../type-aliases/ItemToObjectIdOptions.md)

### Returns

`T`

### Source

[lib/mongo-item/index.ts:166](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L166)

## itemToObjectId(items, options)

> **itemToObjectId**\<`T`\>(`items`, `options`?): `T`[]

Reduces an array of `items` down to their respective `ObjectId` instances.

An attempt is made to eliminate duplicates via `new Set(...)`, but the
absence of duplicates is not guaranteed when `items` contains `WithId<...>`
objects.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **items**: [`IdItemArray`](../type-aliases/IdItemArray.md)\<`T`\>

• **options?**: [`ItemToObjectIdOptions`](../type-aliases/ItemToObjectIdOptions.md)

### Returns

`T`[]

### Source

[lib/mongo-item/index.ts:177](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L177)
