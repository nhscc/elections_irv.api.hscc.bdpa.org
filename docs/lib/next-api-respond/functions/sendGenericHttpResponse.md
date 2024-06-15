[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-respond](../README.md) / sendGenericHttpResponse

# Function: sendGenericHttpResponse()

> **sendGenericHttpResponse**(`res`, `statusCode`, `responseJson`?): `void`

Sends a generic HTTP response with the given `statusCode` and optional
`responseJson` body (defaults to `{}`). This is the "base" function called by
all other response functions.

## Parameters

• **res**: `NextApiResponse`

• **statusCode**: `HttpStatusCode`

• **responseJson?**: `Record`\<`string`, `unknown`\>

## Returns

`void`

## Source

[lib/next-api-respond/index.ts:9](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-respond/index.ts#L9)
