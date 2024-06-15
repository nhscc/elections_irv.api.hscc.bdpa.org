[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / NotAuthorizedError

# Class: NotAuthorizedError

Represents a failure to authorize.

## Extends

- [`AuthError`](AuthError.md)

## Constructors

### new NotAuthorizedError()

> **new NotAuthorizedError**(`message`?): [`NotAuthorizedError`](NotAuthorizedError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`NotAuthorizedError`](NotAuthorizedError.md)

#### Overrides

[`AuthError`](AuthError.md).[`constructor`](AuthError.md#constructors)

#### Source

node\_modules/named-app-errors/dist/modules/error/auth/not-authorized.d.ts:6

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`AuthError`](AuthError.md).[`cause`](AuthError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`AuthError`](AuthError.md).[`message`](AuthError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`AuthError`](AuthError.md).[`name`](AuthError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`AuthError`](AuthError.md).[`stack`](AuthError.md#stack)

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

[`AuthError`](AuthError.md).[`prepareStackTrace`](AuthError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`AuthError`](AuthError.md).[`stackTraceLimit`](AuthError.md#stacktracelimit)

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

[`AuthError`](AuthError.md).[`captureStackTrace`](AuthError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
