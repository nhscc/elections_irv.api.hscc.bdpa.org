[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/json-node-fetch](../README.md) / jsonFetch

# Function: jsonFetch()

## jsonFetch(url, init)

> **jsonFetch**\<`JsonType`, `ErrorType`\>(`url`, `init`?): `Promise`\<`object`\>

Fetches a resource and returns an object containing two items: the response
itself under `res` and the response body parsed as JSON under either `error`
(if the response has a non-2xx status) or `json`.

If the response was not received with an `application/json` content-type
header or has a non-2xx status _and_ unparseable response body, `json` will
be undefined and `error` will be an empty object.

This function rejects if 1) the request body cannot be parsed as JSON but is
being sent with an `application/json` content-type header or 2) the response
body cannot be parsed as JSON but was received with an `application/json`
content-type header.

### Type parameters

• **JsonType** *extends* `JsonObject` = `JsonObject`

• **ErrorType** *extends* `JsonObject` = `JsonType`

### Parameters

• **url**: `string`

• **init?**: `Omit`\<[`JsonRequestInit`](../type-aliases/JsonRequestInit.md), `"rejectIfNotOk"` \| `"rejectIfNonJsonContentType"`\> & `object`

### Returns

`Promise`\<`object`\>

#### error

> **error**: `Partial`\<`ErrorType`\> \| `undefined`

#### json

> **json**: `JsonType` \| `undefined`

#### res

> **res**: `Response`

### Example

```
type ResJson = { myNumber: number };
type ResErr = { reason: string };
const { res, json, error } = await jsonFetch<ResJson, ResErr>(
  'api/endpoint',
  {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}` },
    body: requestData
  }
);

if (error) {
  console.error(error?.reason ?? (res.ok
      ? 'bad json'
      : res.statusText));
} else {
  console.log(`number is: ${json?.myNumber}`);
}
```

### Source

[lib/json-node-fetch/index.ts:121](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L121)

## jsonFetch(url, init)

> **jsonFetch**\<`JsonType`, `ErrorType`\>(`url`, `init`): `Promise`\<`object`\>

Fetches a resource and returns an object containing two items: the response
itself under `res` and the response body parsed as JSON under either `error`
(if the response has a non-2xx status) or `json`.

If the response was received with a non-2xx status _and_ unparseable response
body, `json` will be undefined and `error` will be an empty object.

This function rejects if 1) the request body cannot be parsed as JSON but is
being sent with an `application/json` content-type header, 2) the response
body cannot be parsed as JSON but was received with an `application/json`
content-type header, or 3) the response was received with a content-type
header other than `application/json`.

### Type parameters

• **JsonType** *extends* `JsonObject` = `JsonObject`

• **ErrorType** *extends* `JsonObject` = `JsonType`

### Parameters

• **url**: `string`

• **init**: `Omit`\<[`JsonRequestInit`](../type-aliases/JsonRequestInit.md), `"rejectIfNotOk"` \| `"rejectIfNonJsonContentType"`\> & `object`

### Returns

`Promise`\<`object`\>

#### error

> **error**: `Partial`\<`ErrorType`\> \| `undefined`

#### json

> **json**: `JsonType` \| `undefined`

#### res

> **res**: `Response`

### Example

```
type ResJson = { myNumber: number };
type ResErr = { reason: string };

try {
  const { res, json, error } = await jsonFetch<ResJson, ResErr>(
    'api/endpoint',
    { rejectIfNonJsonContentType: true }
  );

  if (error) {
    console.error(error?.reason ?? res.statusText);
  } else {
    console.log(`number is: ${json?.myNumber}`);
  }
} catch(e) {
  if(e instanceof JsonFetchError) {
    // Special handling for non-json response bodies
    specialHandler(e.res.status, e.json);
  } else {
    throw e;
  }
}
```

### Source

[lib/json-node-fetch/index.ts:175](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L175)

## jsonFetch(url, init)

> **jsonFetch**\<`JsonType`, `ErrorType`\>(`url`, `init`): `Promise`\<`object`\>

Fetches a resource and returns an object containing two items: the response
itself under `res` and either the response body parsed as JSON under `json`
or, if the response was received with a content-type header other than
`application/json`, an empty object under `error`.

This function rejects if 1) the request body cannot be parsed as JSON but is
being sent with an `application/json` content-type header, 2) the response
body cannot be parsed as JSON but was received with an `application/json`
content-type header, or 3) the response was received with a non-2xx status.

### Type parameters

• **JsonType** *extends* `JsonObject` = `JsonObject`

• **ErrorType** *extends* `JsonObject` = `JsonType`

### Parameters

• **url**: `string`

• **init**: `Omit`\<[`JsonRequestInit`](../type-aliases/JsonRequestInit.md), `"rejectIfNotOk"` \| `"rejectIfNonJsonContentType"`\> & `object`

### Returns

`Promise`\<`object`\>

#### error

> **error**: `Partial`\<`ErrorType`\> \| `undefined`

#### json

> **json**: `JsonType` \| `undefined`

#### res

> **res**: `Response`

### Example

```
type ResJson = { myNumber: number };
type ResErr = { reason: string };

try {
  const { res, json, error } = await jsonFetch<ResJson, ResErr>(
    'api/endpoint',
    { rejectIfNotOk: true }
  );

  if (error) {
    console.error(error?.reason ?? 'bad json');
  } else {
    console.log(`number is: ${json?.myNumber}`);
  }
} catch(e) {
  if(e instanceof JsonFetchError) {
    // Special handling for non-2xx responses
    specialHandler(e.res.status, e.json);
  } else {
    throw e;
  }
}
```

### Source

[lib/json-node-fetch/index.ts:226](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L226)

## jsonFetch(url, init)

> **jsonFetch**\<`JsonType`, `ErrorType`\>(`url`, `init`): `Promise`\<`object`\>

Fetches a resource and returns an object containing two items: the response
itself under `res` and and the response body parsed as JSON under `json`.

This function rejects if 1) the request body cannot be parsed as JSON but is
being sent with an `application/json` content-type header, 2) the response
body cannot be parsed as JSON but was received with an `application/json`
content-type header, 3) the response was received with a content-type header
other than `application/json`, or 4) the response was received with a non-2xx
status.

Hence, when jsonFetch is called in this way, `json` will always be defined
and `error` will always be undefined.

### Type parameters

• **JsonType** *extends* `JsonObject` = `JsonObject`

• **ErrorType** *extends* `JsonObject` = `JsonType`

### Parameters

• **url**: `string`

• **init**: `Omit`\<[`JsonRequestInit`](../type-aliases/JsonRequestInit.md), `"rejectIfNotOk"` \| `"rejectIfNonJsonContentType"`\> & `object`

### Returns

`Promise`\<`object`\>

#### error

> **error**: `undefined`

#### json

> **json**: `JsonType`

#### res

> **res**: `Response`

### Example

```
try {
  const url = 'https://some.resource.com/data.json';
  const { json } = await jsonFetch(url, {
    rejectIfNotOk: true,
    rejectIfNonJsonContentType: true
  });
  doSomethingWith(json);
} catch(e) {
  if(e instanceof JsonFetchError) {
    // Special handling for non-2xx/non-json response bodies
    specialHandler(e.res.status, e.json);
  } else {
    throw e;
  }
}
```

### Source

[lib/json-node-fetch/index.ts:273](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-node-fetch/index.ts#L273)
