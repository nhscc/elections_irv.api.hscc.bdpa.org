[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / ClientValidationError

# Class: ClientValidationError

Represents a generic validation failure due to user error.

## Extends

- [`ValidationError`](ValidationError.md)

## Extended by

- [`InvalidClientConfigurationError`](InvalidClientConfigurationError.md)
- [`InvalidItemError`](InvalidItemError.md)
- [`InvalidSecretError`](InvalidSecretError.md)

## Constructors

### new ClientValidationError()

> **new ClientValidationError**(`message`?): [`ClientValidationError`](ClientValidationError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`ClientValidationError`](ClientValidationError.md)

#### Overrides

[`ValidationError`](ValidationError.md).[`constructor`](ValidationError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/client-validation.d.ts:6

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`ValidationError`](ValidationError.md).[`cause`](ValidationError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`ValidationError`](ValidationError.md).[`message`](ValidationError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`ValidationError`](ValidationError.md).[`name`](ValidationError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`ValidationError`](ValidationError.md).[`stack`](ValidationError.md#stack)

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

[`ValidationError`](ValidationError.md).[`prepareStackTrace`](ValidationError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`ValidationError`](ValidationError.md).[`stackTraceLimit`](ValidationError.md#stacktracelimit)

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

[`ValidationError`](ValidationError.md).[`captureStackTrace`](ValidationError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
