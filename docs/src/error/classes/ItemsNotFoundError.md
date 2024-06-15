[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / ItemsNotFoundError

# Class: ItemsNotFoundError\<T\>

Represents a failure to locate one or more items or resources
represented by a string literal `item` or the item's constructor name.

## Extends

- [`NotFoundError`](NotFoundError.md)

## Type parameters

• **T** = `unknown`

## Constructors

### new ItemsNotFoundError()

> **new ItemsNotFoundError**\<`T`\>(`itemOrName`?): [`ItemsNotFoundError`](ItemsNotFoundError.md)\<`T`\>

Represents a failure to locate one or more items or resources
represented by a string literal `item` or the item's constructor name.

#### Parameters

• **itemOrName?**: `T`

#### Returns

[`ItemsNotFoundError`](ItemsNotFoundError.md)\<`T`\>

#### Overrides

[`NotFoundError`](NotFoundError.md).[`constructor`](NotFoundError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/items-not-found.d.ts:12

### new ItemsNotFoundError()

> **new ItemsNotFoundError**\<`T`\>(`itemOrName`, `message`): [`ItemsNotFoundError`](ItemsNotFoundError.md)\<`T`\>

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **itemOrName**: `T`

• **message**: `string`

#### Returns

[`ItemsNotFoundError`](ItemsNotFoundError.md)\<`T`\>

#### Overrides

`NotFoundError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/items-not-found.d.ts:17

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`NotFoundError`](NotFoundError.md).[`cause`](NotFoundError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### itemOrName

> `readonly` **itemOrName**: `undefined` \| `T`

#### Source

node\_modules/named-app-errors/dist/modules/error/not-found/items-not-found.d.ts:7

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
