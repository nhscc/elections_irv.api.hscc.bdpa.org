[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [test/setup](../README.md) / FactoryExhaustionError

# Class: FactoryExhaustionError

Represents a generic failure that occurred during testing (e.g. with Jest).

## Extends

- [`TrialError`](../../../src/error/classes/TrialError.md)

## Constructors

### new FactoryExhaustionError()

> **new FactoryExhaustionError**(`message`?): [`FactoryExhaustionError`](FactoryExhaustionError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`FactoryExhaustionError`](FactoryExhaustionError.md)

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`constructor`](../../../src/error/classes/TrialError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

### new FactoryExhaustionError()

> **new FactoryExhaustionError**(`message`?, `options`?): [`FactoryExhaustionError`](FactoryExhaustionError.md)

#### Parameters

• **message?**: `string`

• **options?**: `ErrorOptions`

#### Returns

[`FactoryExhaustionError`](FactoryExhaustionError.md)

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`constructor`](../../../src/error/classes/TrialError.md#constructors)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`cause`](../../../src/error/classes/TrialError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`message`](../../../src/error/classes/TrialError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`name`](../../../src/error/classes/TrialError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`stack`](../../../src/error/classes/TrialError.md#stack)

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

[`TrialError`](../../../src/error/classes/TrialError.md).[`prepareStackTrace`](../../../src/error/classes/TrialError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`TrialError`](../../../src/error/classes/TrialError.md).[`stackTraceLimit`](../../../src/error/classes/TrialError.md#stacktracelimit)

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

[`TrialError`](../../../src/error/classes/TrialError.md).[`captureStackTrace`](../../../src/error/classes/TrialError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
