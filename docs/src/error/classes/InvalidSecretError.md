[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / InvalidSecretError

# Class: InvalidSecretError

Represents encountering invalid or illegal credentials, key material, some
token, or other secret data provided by the user.

## Extends

- [`ClientValidationError`](ClientValidationError.md)

## Constructors

### new InvalidSecretError()

> **new InvalidSecretError**(`secretType`?): [`InvalidSecretError`](InvalidSecretError.md)

Represents encountering invalid or illegal credentials, key material, some
token, or other secret data provided by the user.

#### Parameters

• **secretType?**: `string`

#### Returns

[`InvalidSecretError`](InvalidSecretError.md)

#### Overrides

[`ClientValidationError`](ClientValidationError.md).[`constructor`](ClientValidationError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-secret.d.ts:12

### new InvalidSecretError()

> **new InvalidSecretError**(`secretType`, `message`): [`InvalidSecretError`](InvalidSecretError.md)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **secretType**: `string`

• **message**: `string`

#### Returns

[`InvalidSecretError`](InvalidSecretError.md)

#### Overrides

`ClientValidationError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-secret.d.ts:17

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`cause`](ClientValidationError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

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

### secretType

> `readonly` **secretType**: `string`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-secret.d.ts:7

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
