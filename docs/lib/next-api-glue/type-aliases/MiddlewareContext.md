[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-api-glue](../README.md) / MiddlewareContext

# Type alias: MiddlewareContext\<Options\>

> **MiddlewareContext**\<`Options`\>: `object`

The shape of a middleware context object, potentially customized with
additional middleware-specific options.

Note that type checking cannot enforce that certain options are passed in the
case that an options argument is omitted when calling `withMiddleware`. So,
to be safe, all custom middleware context options should be declared as
optional (i.e. `{ myOpt?: aType }` instead of `{ myOpt: aType })`.

Middleware should default to the most restrictive configuration possible if
its respective options are missing.

## Type parameters

• **Options** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Type declaration

### options

> **options**: `Options` & `object`

Options expected by middleware functions at runtime.

#### Type declaration

##### callDoneOnEnd

> **callDoneOnEnd**: `boolean`

If `true`, `context.runtime.done` is called whenever `response.end` is
called before the middleware chain completes execution. If `false`, the
entire primary middleware chain will always run to completion, even if
the response has already been sent before it completes.

###### Default

```ts
true
```

### runtime

> **runtime**: `object`

Contains middleware use chain control functions and various metadata.

### runtime.done()

> `readonly` **done**: () => `void`

Stop calling middleware functions, effectively aborting execution of the
use chain. If `response.end` hasn't been called before calling this
function, it will be called automatically. On abort, the handler will
also be skipped.

#### Returns

`void`

### runtime.endpoint

> **endpoint**: `object`

Metadata describing the current endpoint.

### runtime.endpoint.descriptor?

> `optional` **descriptor**: `string`

A parameterized path string in the form of a URI path corresponding to
the current endpoint. For example: `/my-endpoint/:some_id`.

### runtime.error

> `readonly` **error**: `unknown`

For middleware run via `useOnError`, the `error` property will contain
the thrown error object.

### runtime.next()

> `readonly` **next**: () => `Promise`\<`void`\>

Call the next middleware function in the use chain. If not called
explicitly before a middleware function resolves, and `done()` was also
not called, `next()` will be called automatically. This means calling
`next()` in a middleware function is entirely optional.

#### Returns

`Promise`\<`void`\>

## Source

[lib/next-api-glue/index.ts:34](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-api-glue/index.ts#L34)
