[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/json-unfetch](../README.md) / swrFetch

# Function: swrFetch()

> **swrFetch**\<`JsonType`\>(`init`?): (`key`) => `Promise`\<`JsonType`\>

Fetches a resource and returns the response body parsed as a JSON object.

This function rejects if 1) the request body cannot be parsed as JSON but is
being sent with an `application/json` content-type header, 2) the response
body cannot be parsed as JSON but was received with an `application/json`
content-type header, 3) the response was received with a content-type header
other than `application/json`, or 4) the response was received with a non-2xx
status.

The object SWR returns will contain the rejection reason under the `error`
property. Usually, `error` is as an instance of JsonUnfetchError complete
with `json` and `res` properties. If unfetch itself fails, the `error`
object returned will not have these properties.

## Type parameters

• **JsonType** *extends* `JsonObject` = `JsonObject`

## Parameters

• **init?**: [`JsonRequestInit`](../type-aliases/JsonRequestInit.md)

## Returns

`Function`

### Parameters

• **key**: `string`

### Returns

`Promise`\<`JsonType`\>

## Example

```
  const { data: json, error } = useSwr('api/endpoint', swrFetch);

  if(error) <div>Error: {error.message}</div>;
  return <div>Hello, your data is: {json.data}</div>;
```

## See

https://swr.vercel.app

## Source

[lib/json-unfetch/index.ts:447](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/json-unfetch/index.ts#L447)
