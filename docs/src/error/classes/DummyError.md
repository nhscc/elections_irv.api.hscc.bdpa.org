[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / DummyError

# Class: DummyError

Represents a generic pseudo-error meant to be thrown, caught, and consumed
during testing (e.g. Jest) to verify error handling behavior.

**This class MUST NEVER appear in production code.**

## Extends

- [`TrialError`](TrialError.md)

## Constructors

### new DummyError()

> **new DummyError**(`message`?): [`DummyError`](DummyError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`DummyError`](DummyError.md)

#### Inherited from

[`TrialError`](TrialError.md).[`constructor`](TrialError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

### new DummyError()

> **new DummyError**(`message`?, `options`?): [`DummyError`](DummyError.md)

#### Parameters

• **message?**: `string`

• **options?**: `ErrorOptions`

#### Returns

[`DummyError`](DummyError.md)

#### Inherited from

[`TrialError`](TrialError.md).[`constructor`](TrialError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`TrialError`](TrialError.md).[`cause`](TrialError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`TrialError`](TrialError.md).[`message`](TrialError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`TrialError`](TrialError.md).[`name`](TrialError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`TrialError`](TrialError.md).[`stack`](TrialError.md#stack)

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

[`TrialError`](TrialError.md).[`prepareStackTrace`](TrialError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`TrialError`](TrialError.md).[`stackTraceLimit`](TrialError.md#stacktracelimit)

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

[`TrialError`](TrialError.md).[`captureStackTrace`](TrialError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
