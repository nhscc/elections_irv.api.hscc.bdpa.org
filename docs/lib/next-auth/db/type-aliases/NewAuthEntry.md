[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/db](../README.md) / NewAuthEntry

# Type alias: NewAuthEntry

> **NewAuthEntry**: `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"`\>

The base shape of a new entry in the well-known "auth" collection. More
complex entry types may or may not extend from or intersect with this type.

Each API has the latitude to generate a token using whichever available
scheme is most convenient. Hence, the only external data necessary to create
a new auth entry is `attributes`.

## Source

[lib/next-auth/db.ts:41](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/db.ts#L41)
