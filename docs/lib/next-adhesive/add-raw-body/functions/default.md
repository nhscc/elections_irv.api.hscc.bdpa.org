[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-adhesive/add-raw-body](../README.md) / default

# Function: default()

> **default**(`req`, `res`, `context`): `Promise`\<`void`\>

Adds a `rawBody` property onto the NextApiRequest object, which contains the
raw unparsed content of the request body if it exists or `undefined` if it
does not. The body is still parsed (using `bodyParser`) like normal using a
custom implementation of Next.js's `parseBody` function.

To use this middleware, `bodyParser` must be disabled via Next.js API route
configuration like so:

```TypeScript
export const config = {
  api: {
    bodyParser: false
  },
}
```

Note that this middleware cannot be used with other middleware or routes that
also directly consume the request body in a special way, such as when using
streams.

## Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

• **context**: [`MiddlewareContext`](../../../next-api-glue/type-aliases/MiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\>

## Returns

`Promise`\<`void`\>

## See

https://nextjs.org/docs/api-routes/api-middlewares#custom-config

## Source

[lib/next-adhesive/add-raw-body.ts:100](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-adhesive/add-raw-body.ts#L100)
