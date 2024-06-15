[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / TrialError

# Class: TrialError

Represents a generic failure that occurred during testing (e.g. with Jest).

## Extends

- [`AppError`](AppError.md)

## Extended by

- [`FactoryExhaustionError`](../../../test/setup/classes/FactoryExhaustionError.md)
- [`DummyError`](DummyError.md)

## Constructors

### new TrialError()

> **new TrialError**(`message`?): [`TrialError`](TrialError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`TrialError`](TrialError.md)

#### Inherited from

[`AppError`](AppError.md).[`constructor`](AppError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

### new TrialError()

> **new TrialError**(`message`?, `options`?): [`TrialError`](TrialError.md)

#### Parameters

• **message?**: `string`

• **options?**: `ErrorOptions`

#### Returns

[`TrialError`](TrialError.md)

#### Inherited from

[`AppError`](AppError.md).[`constructor`](AppError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`AppError`](AppError.md).[`cause`](AppError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`AppError`](AppError.md).[`message`](AppError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`AppError`](AppError.md).[`name`](AppError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`AppError`](AppError.md).[`stack`](AppError.md#stack)

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

[`AppError`](AppError.md).[`prepareStackTrace`](AppError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`AppError`](AppError.md).[`stackTraceLimit`](AppError.md#stacktracelimit)

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

[`AppError`](AppError.md).[`captureStackTrace`](AppError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
