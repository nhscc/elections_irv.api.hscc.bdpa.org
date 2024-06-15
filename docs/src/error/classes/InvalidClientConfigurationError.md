[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / InvalidClientConfigurationError

# Class: InvalidClientConfigurationError

Represents a user-provided misconfiguration.

## Extends

- [`ClientValidationError`](ClientValidationError.md)

## Constructors

### new InvalidClientConfigurationError()

> **new InvalidClientConfigurationError**(`details`?): [`InvalidClientConfigurationError`](InvalidClientConfigurationError.md)

Represents a user-provided misconfiguration.

#### Parameters

• **details?**: `string`

#### Returns

[`InvalidClientConfigurationError`](InvalidClientConfigurationError.md)

#### Overrides

[`ClientValidationError`](ClientValidationError.md).[`constructor`](ClientValidationError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-client-configuration.d.ts:10

### new InvalidClientConfigurationError()

> **new InvalidClientConfigurationError**(`details`, `message`): [`InvalidClientConfigurationError`](InvalidClientConfigurationError.md)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **details**: `string`

• **message**: `string`

#### Returns

[`InvalidClientConfigurationError`](InvalidClientConfigurationError.md)

#### Overrides

`ClientValidationError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-client-configuration.d.ts:15

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`ClientValidationError`](ClientValidationError.md).[`cause`](ClientValidationError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### details

> `readonly` **details**: `undefined` \| `string`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/client-validation/invalid-client-configuration.d.ts:6

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
