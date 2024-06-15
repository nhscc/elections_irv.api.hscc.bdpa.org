[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/json-unfetch](../README.md) / JsonRequestInit

# Type alias: JsonRequestInit

> **JsonRequestInit**: `Omit`\<[`RequestInit`](RequestInit.md), `"body"`\> & `object`

Options to configure how jsonFetch executes.

## See

https://github.com/developit/unfetch#api

## Type declaration

### body?

> `optional` **body**: [`BodyInit`](BodyInit.md) \| `JsonObject` \| `JsonPrimitive`

The request body to send. Automatically stringified (via `JSON.stringify`)
if request content-type is `application/json`.

Note that this type is loose enough to accept JSON objects, but if you're
not using the `application/json` content-type when passing a JSON object as
the body then jsonFetch will reject with an error.

### rejectIfNonJsonContentType?

> `optional` **rejectIfNonJsonContentType**: `boolean`

If `true`, jsonFetch will reject when a response is missing the
`application/json` content-type header; if `false`, `json` will be
undefined and `error` will be an empty object.

#### Default

```ts
false
```

### rejectIfNotOk?

> `optional` **rejectIfNotOk**: `boolean`

If `true`, jsonFetch will reject when `response.ok` is not `true`; if
`false`, `json` will be undefined and `error` will be an empty object.

#### Default

```ts
false
```

#### See

https://developer.mozilla.org/en-US/docs/Web/API/Response/ok

### swr?

> `optional` **swr**: `boolean`

Enables SWR compatibility mode when `true`. Favor importing `swrFetch`, a
SWR syntactic sugar function, to use SWR compatibility rather than setting
this manually.

#### Default

```ts
false
```

## Source

[lib/json-unfetch/index.ts:36](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-unfetch/index.ts#L36)
