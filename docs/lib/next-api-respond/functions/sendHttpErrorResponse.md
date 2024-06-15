[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-respond](../README.md) / sendHttpErrorResponse

# Function: sendHttpErrorResponse()

> **sendHttpErrorResponse**(`res`, `statusCode`, `responseJson`): `JsonError`

Sends a generic "error" response and `responseJson` body, optionally with
additional properties. This function is called by all non-2xx response
functions.

## Parameters

• **res**: `NextApiResponse`

• **statusCode**: `HttpStatusCode`

• **responseJson**: `Record`\<`string`, `unknown`\> & `object`

## Returns

`JsonError`

## Source

[lib/next-api-respond/index.ts:39](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-respond/index.ts#L39)
