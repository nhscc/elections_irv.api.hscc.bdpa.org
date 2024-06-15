[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-item](../README.md) / itemExists

# Function: itemExists()

## itemExists(collection, id, options)

> **itemExists**\<`T`\>(`collection`, `id`, `options`?): `Promise`\<`boolean`\>

Checks if an item matching `{ _id: id }` exists within `collection`.

### Type parameters

• **T** *extends* `Document`

### Parameters

• **collection**: `Collection`\<`T`\>

• **id**: `string` \| `ObjectId`

• **options?**: [`ItemExistsOptions`](../type-aliases/ItemExistsOptions.md)

### Returns

`Promise`\<`boolean`\>

### Source

[lib/mongo-item/index.ts:44](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L44)

## itemExists(collection, descriptor, options)

> **itemExists**\<`T`\>(`collection`, `descriptor`, `options`?): `Promise`\<`boolean`\>

Checks if an item matching `{ [descriptor.key]: descriptor.id }` exists
within `collection`.

### Type parameters

• **T** *extends* `Document`

### Parameters

• **collection**: `Collection`\<`T`\>

• **descriptor**

• **descriptor.id**: `string` \| `ObjectId`

• **descriptor.key?**: `string`

• **options?**: [`ItemExistsOptions`](../type-aliases/ItemExistsOptions.md)

### Returns

`Promise`\<`boolean`\>

### Source

[lib/mongo-item/index.ts:53](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-item/index.ts#L53)
