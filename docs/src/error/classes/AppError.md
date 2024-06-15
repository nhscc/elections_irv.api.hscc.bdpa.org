[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / AppError

# Class: AppError

Represents a generic application exception.

## Extends

- `Error`

## Extended by

- [`AuthError`](AuthError.md)
- [`HttpError`](HttpError.md)
- [`NotFoundError`](NotFoundError.md)
- [`TrialError`](TrialError.md)
- [`ValidationError`](ValidationError.md)
- [`GuruMeditationError`](GuruMeditationError.md)
- [`NotImplementedError`](NotImplementedError.md)

## Constructors

### new AppError()

> **new AppError**(`message`?): [`AppError`](AppError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`AppError`](AppError.md)

#### Inherited from

`Error.constructor`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

### new AppError()

> **new AppError**(`message`?, `options`?): [`AppError`](AppError.md)

#### Parameters

• **message?**: `string`

• **options?**: `ErrorOptions`

#### Returns

[`AppError`](AppError.md)

#### Inherited from

`Error.constructor`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

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

`Error.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

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

`Error.captureStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:21
