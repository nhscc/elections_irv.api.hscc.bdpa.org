[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-item](../README.md) / itemToStringId

# Function: itemToStringId()

## itemToStringId(item)

> **itemToStringId**\<`T`\>(`item`): `string`

Reduces an `item` down to the string representation of its `ObjectId`
instance.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **item**: [`IdItem`](../type-aliases/IdItem.md)\<`T`\>

### Returns

`string`

### Source

[lib/mongo-item/index.ts:236](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L236)

## itemToStringId(items)

> **itemToStringId**\<`T`\>(`items`): `string`[]

Reduces an array of `items` down to the string representations of their
respective `ObjectId` instances.

### Type parameters

• **T** *extends* `ObjectId`

### Parameters

• **items**: [`IdItemArray`](../type-aliases/IdItemArray.md)\<`T`\>

### Returns

`string`[]

### Source

[lib/mongo-item/index.ts:241](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L241)
