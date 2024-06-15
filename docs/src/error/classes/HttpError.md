[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / HttpError

# Class: HttpError

Represents a generic HTTP or related failure.

## Extends

- [`AppError`](AppError.md)

## Constructors

### new HttpError()

> **new HttpError**(`error`?): [`HttpError`](HttpError.md)

Represents a generic HTTP or related failure.

#### Parameters

• **error?**: `string`

#### Returns

[`HttpError`](HttpError.md)

#### Overrides

[`AppError`](AppError.md).[`constructor`](AppError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/http/http.d.ts:19

### new HttpError()

> **new HttpError**(`res`?, `error`?): [`HttpError`](HttpError.md)

Represents a generic HTTP or related failure.

#### Parameters

• **res?**: `ServerResponseLike`

• **error?**: `string`

#### Returns

[`HttpError`](HttpError.md)

#### Overrides

[`AppError`](AppError.md).[`constructor`](AppError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/http/http.d.ts:23

### new HttpError()

> **new HttpError**(`res`, `error`, `message`): [`HttpError`](HttpError.md)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

• **res**: `ServerResponseLike`

• **error**: `string`

• **message**: `string`

#### Returns

[`HttpError`](HttpError.md)

#### Overrides

`AppError.constructor`

#### Source

node\_modules/named-app-errors/dist/modules/error/http/http.d.ts:28

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

### res

> `readonly` **res**: `undefined` \| `string` \| `ServerResponseLike`

#### Source

node\_modules/named-app-errors/dist/modules/error/http/http.d.ts:15

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
