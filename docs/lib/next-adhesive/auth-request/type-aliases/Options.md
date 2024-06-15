[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-adhesive/auth-request](../README.md) / Options

# Type alias: Options

> **Options**: `object`

## Type declaration

### requiresAuth?

> `optional` **requiresAuth**: `boolean` \| `object`

If not `false` or falsy, accessing this endpoint requires a valid (yet
unfortunately named) Authorization header.

If one or more schemes are provided, the request will be authenticated
using one of said schemes. If no schemes are provided, the request will be
authenticated using any available scheme.

Additionally, if one or more constraints are provided, the request will be
authorized conditioned upon said constraints. If no constraints are
provided, all requests will be vacuously authorized.

## Source

[lib/next-adhesive/auth-request.ts:22](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-adhesive/auth-request.ts#L22)
