[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/json-node-fetch](../README.md) / JsonFetchError

# Class: JsonFetchError\<T\>

Represents a JSON Fetch error.

## Extends

- `FetchError`

## Type parameters

• **T** *extends* `JsonObject` \| `JsonPrimitive` \| `undefined`

## Constructors

### new JsonFetchError()

> **new JsonFetchError**\<`T`\>(`res`, `json`, `message`): [`JsonFetchError`](JsonFetchError.md)\<`T`\>

#### Parameters

• **res**: `undefined` \| `Response`

• **json**: `T`

• **message**: `string`

#### Returns

[`JsonFetchError`](JsonFetchError.md)\<`T`\>

#### Overrides

`FetchError.constructor`

#### Source

[lib/json-node-fetch/index.ts:22](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L22)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`FetchError.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### code?

> `optional` **code**: `string`

#### Inherited from

`FetchError.code`

#### Source

node\_modules/@types/node-fetch/index.d.ts:154

***

### errno?

> `optional` **errno**: `string`

#### Inherited from

`FetchError.errno`

#### Source

node\_modules/@types/node-fetch/index.d.ts:155

***

### json

> `readonly` **json**: `T`

#### Source

[lib/json-node-fetch/index.ts:24](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L24)

***

### message

> **message**: `string`

#### Inherited from

`FetchError.message`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `"FetchError"`

#### Inherited from

`FetchError.name`

#### Source

node\_modules/@types/node-fetch/index.d.ts:151

***

### res

> `readonly` **res**: `undefined` \| `Response`

#### Source

[lib/json-node-fetch/index.ts:23](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L23)

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`FetchError.stack`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### type

> **type**: `string`

#### Inherited from

`FetchError.type`

#### Source

node\_modules/@types/node-fetch/index.d.ts:153

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

`FetchError.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`FetchError.stackTraceLimit`

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

`FetchError.captureStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:21
