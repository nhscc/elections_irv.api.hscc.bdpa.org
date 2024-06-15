[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / ItemNotFoundError

# Class: ItemNotFoundError\<T\>

Represents a failure to locate a specific item or resource, optionally
represented by a string literal `itemName` or the item's constructor name.

## Extends

- [`NotFoundError`](NotFoundError.md)

## Type parameters

• **T** = `unknown`

## Constructors

### new ItemNotFoundError()

> **new ItemNotFoundError**\<`T`\>(`item`?, `itemName`?): [`ItemNotFoundError`](ItemNotFoundError.md)\<`T`\>

Represents a failure to locate a specific item or resource, optionally
represented by a string literal `itemName` or the item's constructor name.

#### Parameters

• **item?**: `T`

• **itemName?**: `string`

#### Returns

[`ItemNotFoundError`](ItemNotFoundError.md)\<`T`\>

#### Overrides

[`NotFoundError`](NotFoundError.md).[`constructor`](NotFoundError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/item-not-found.d.ts:13

### new ItemNotFoundError()

> **new ItemNotFoundError**\<`T`\>(`item`, `itemName`, `message`): [`ItemNotFoundError`](ItemNotFoundError.md)\<`T`\>

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **item**: `T`

• **itemName**: `string`

• **message**: `string`

#### Returns

[`ItemNotFoundError`](ItemNotFoundError.md)\<`T`\>

#### Overrides

`NotFoundError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/item-not-found.d.ts:18

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`cause`](NotFoundError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### item

> `readonly` **item**: `undefined` \| `T`

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/item-not-found.d.ts:7

***

### itemName

> `readonly` **itemName**: `undefined` \| `string`

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/item-not-found.d.ts:8

***

### message

> **message**: `string`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`message`](NotFoundError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`name`](NotFoundError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`stack`](NotFoundError.md#stack)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`prepareStackTrace`](NotFoundError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`stackTraceLimit`](NotFoundError.md#stacktracelimit)

#### Source

node\_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`captureStackTrace`](NotFoundError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
