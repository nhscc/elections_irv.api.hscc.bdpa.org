[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-glue](../README.md) / middlewareFactory

# Function: middlewareFactory()

> **middlewareFactory**\<`Options`\>(`__namedParameters`): \<`PassedOptions`\>(`pagesHandler`, `params`) => (`req`, `res`) => `Promise`\<`void`\>

Returns a `withMiddleware` function decorated with a preset configuration.
`withMiddleware` optionally accepts its usual parameters, which will be
appended onto the arguments to `withMiddlewareFactory` (the "preset
parameters"); however, note that passed option keys will overwrite their
preset counterparts.

Useful when you don't want to repeatedly import, configure, and list a bunch
of middleware every time you want to call `withMiddleware`.

## Type parameters

• **Options** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.options?**: `Partial`\<`NoInfer`\<`Options`\> & `object`\> & `NoInfer`\<`Options`\>

• **\_\_namedParameters.use**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

• **\_\_namedParameters.useOnError?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

## Returns

`Function`

### Type parameters

• **PassedOptions** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

### Parameters

• **pagesHandler**: `undefined` \| `NextApiHandler`

• **params**

• **params.appendUse?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

• **params.appendUseOnError?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

• **params.descriptor**: `undefined` \| `string`

• **params.options?**: `Partial`\<`NoInfer`\<`Options`\> & `object`\> & `NoInfer`\<`PassedOptions`\>

• **params.prependUse?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

• **params.prependUseOnError?**: [`Middleware`](../type-aliases/Middleware.md)\<`NoInfer`\<`Options`\>\>[]

### Returns

`Function`

#### Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

#### Returns

`Promise`\<`void`\>

## Source

[lib/next-api-glue/index.ts:337](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-glue/index.ts#L337)
