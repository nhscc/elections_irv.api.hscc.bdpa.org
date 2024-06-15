[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / InvalidAppEnvironmentError

# Class: InvalidAppEnvironmentError

Represents a misconfigured runtime environment outside of the user's control.

## Extends

- [`AppValidationError`](AppValidationError.md)

## Constructors

### new InvalidAppEnvironmentError()

> **new InvalidAppEnvironmentError**(`details`?): [`InvalidAppEnvironmentError`](InvalidAppEnvironmentError.md)

Represents a misconfigured runtime environment outside of the user's
control.

#### Parameters

• **details?**: `string`

#### Returns

[`InvalidAppEnvironmentError`](InvalidAppEnvironmentError.md)

#### Overrides

[`AppValidationError`](AppValidationError.md).[`constructor`](AppValidationError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/app-validation/invalid-app-environment.d.ts:11

### new InvalidAppEnvironmentError()

> **new InvalidAppEnvironmentError**(`details`, `message`): [`InvalidAppEnvironmentError`](InvalidAppEnvironmentError.md)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **details**: `string`

• **message**: `string`

#### Returns

[`InvalidAppEnvironmentError`](InvalidAppEnvironmentError.md)

#### Overrides

`AppValidationError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/app-validation/invalid-app-environment.d.ts:16

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`AppValidationError`](AppValidationError.md).[`cause`](AppValidationError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### details

> `readonly` **details**: `undefined` \| `string`

#### Source

node\_modules/named-app-errors/dist/modules/error/validation/app-validation/invalid-app-environment.d.ts:6

***

### message

> **message**: `string`

#### Inherited from

[`AppValidationError`](AppValidationError.md).[`message`](AppValidationError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`AppValidationError`](AppValidationError.md).[`name`](AppValidationError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`AppValidationError`](AppValidationError.md).[`stack`](AppValidationError.md#stack)

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

[`AppValidationError`](AppValidationError.md).[`prepareStackTrace`](AppValidationError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`AppValidationError`](AppValidationError.md).[`stackTraceLimit`](AppValidationError.md#stacktracelimit)

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

[`AppValidationError`](AppValidationError.md).[`captureStackTrace`](AppValidationError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
