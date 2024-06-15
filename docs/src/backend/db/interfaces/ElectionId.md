[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [src/backend/db](../README.md) / ElectionId

# Interface: ElectionId

## Extends

- `ObjectId`

## Accessors

### \_bsontype

> `get` **\_bsontype**(): `"ObjectId"`

#### Returns

`"ObjectId"`

#### Source

node\_modules/bson/bson.d.ts:1230

***

### id

> `get` **id**(): `Uint8Array`

The ObjectId bytes

#### Returns

`Uint8Array`

#### Source

node\_modules/bson/bson.d.ts:1278

## Methods

### equals()

> **equals**(`otherId`): `boolean`

Compares the equality of this ObjectId with `otherID`.

#### Parameters

• **otherId**: `undefined` \| `null` \| `string` \| `ObjectId` \| `ObjectIdLike`

ObjectId instance to compare against.

#### Returns

`boolean`

#### Inherited from

`ObjectId.equals`

#### Source

node\_modules/bson/bson.d.ts:1302

***

### getTimestamp()

> **getTimestamp**(): `Date`

Returns the generation date (accurate up to the second) that this ID was generated.

#### Returns

`Date`

#### Inherited from

`ObjectId.getTimestamp`

#### Source

node\_modules/bson/bson.d.ts:1304

***

### inspect()

> **inspect**(`depth`?, `options`?, `inspect`?): `string`

Converts to a string representation of this Id.

#### Parameters

• **depth?**: `number`

• **options?**: `unknown`

• **inspect?**: `InspectFn`

#### Returns

`string`

return the 24 character hex string representation.

#### Inherited from

`ObjectId.inspect`

#### Source

node\_modules/bson/bson.d.ts:1333

***

### toHexString()

> **toHexString**(): `string`

Returns the ObjectId id as a 24 lowercase character hex string representation

#### Returns

`string`

#### Inherited from

`ObjectId.toHexString`

#### Source

node\_modules/bson/bson.d.ts:1281

***

### toJSON()

> **toJSON**(): `string`

Converts to its JSON the 24 character hex string representation.

#### Returns

`string`

#### Inherited from

`ObjectId.toJSON`

#### Source

node\_modules/bson/bson.d.ts:1295

***

### toString()

> **toString**(`encoding`?): `string`

Converts the id into a 24 character hex string for printing, unless encoding is provided.

#### Parameters

• **encoding?**: `"base64"` \| `"hex"`

hex or base64

#### Returns

`string`

#### Inherited from

`ObjectId.toString`

#### Source

node\_modules/bson/bson.d.ts:1293
