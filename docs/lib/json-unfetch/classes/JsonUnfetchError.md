[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/json-unfetch](../README.md) / JsonUnfetchError

# Class: JsonUnfetchError\<T\>

Represents a JSON (un)Fetch error.

## Extends

- `Error`

## Type parameters

• **T** *extends* `JsonObject` \| `JsonPrimitive` \| `undefined`

## Constructors

### new JsonUnfetchError()

> **new JsonUnfetchError**\<`T`\>(`res`, `json`, `message`): [`JsonUnfetchError`](JsonUnfetchError.md)\<`T`\>

#### Parameters

• **res**: `undefined` \| `UnfetchResponse`

• **json**: `T`

• **message**: `string`

#### Returns

[`JsonUnfetchError`](JsonUnfetchError.md)\<`T`\>

#### Overrides

`Error.constructor`

#### Source

[lib/json-unfetch/index.ts:17](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-unfetch/index.ts#L17)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### json

> `readonly` **json**: `T`

#### Source

[lib/json-unfetch/index.ts:19](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-unfetch/index.ts#L19)

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

### res

> `readonly` **res**: `undefined` \| `UnfetchResponse`

#### Source

[lib/json-unfetch/index.ts:18](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-unfetch/index.ts#L18)

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
