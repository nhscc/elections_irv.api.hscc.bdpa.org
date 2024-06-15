[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / Token

# Type alias: Token

> **Token**: `object`

The shape of the actual token and scheme data contained within an entry in
the well-known "auth" collection.

## Type declaration

### scheme

> **scheme**: [`AuthenticationScheme`](../../authenticate/type-aliases/AuthenticationScheme.md)

The authentication scheme this token supports.

### token

> **token**: `JsonObject`

The actual token.

## Source

[lib/next-auth/token.ts:42](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L42)
