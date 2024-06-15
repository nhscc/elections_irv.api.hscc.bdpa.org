[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / InvalidItemError

# Class: InvalidItemError\<T\>

Represents encountering an invalid item as the result of bad user input.

## Extends

- [`ClientValidationError`](ClientValidationError.md)

## Type parameters

• **T** = `undefined`

## Constructors

### new InvalidItemError()

> **new InvalidItemError**\<`T`\>(`item`?, `itemName`?): [`InvalidItemError`](InvalidItemError.md)\<`T`\>

Represents encountering an invalid item as the result of bad user input.

#### Parameters

• **item?**: `T`

• **itemName?**: `string`

#### Returns

[`InvalidItemError`](InvalidItemError.md)\<`T`\>

#### Overrides

[`ClientValidationError`](ClientValidationError.md).[`constructor`](ClientValidationError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-item.d.ts:11

### new InvalidItemError()

> **new InvalidItemError**\<`T`\>(`item`, `itemName`, `message`): [`InvalidItemError`](InvalidItemError.md)\<`T`\>

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **item**: `T`

• **itemName**: `string`

• **message**: `string`

#### Returns

[`InvalidItemError`](InvalidItemError.md)\<`T`\>

#### Overrides

`ClientValidationError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-item.d.ts:16

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`cause`](ClientValidationError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### item

> `readonly` **item**: `undefined` \| `T`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-item.d.ts:6

***

### itemName

> `readonly` **itemName**: `string`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-item.d.ts:7

***

### message

> **message**: `string`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`message`](ClientValidationError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`name`](ClientValidationError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`stack`](ClientValidationError.md#stack)

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

[`ClientValidationError`](ClientValidationError.md).[`prepareStackTrace`](ClientValidationError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`stackTraceLimit`](ClientValidationError.md#stacktracelimit)

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

[`ClientValidationError`](ClientValidationError.md).[`captureStackTrace`](ClientValidationError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
