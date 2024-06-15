[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/db](../README.md) / PublicAuthEntry

# Type alias: PublicAuthEntry

> **PublicAuthEntry**: `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"` \| `"scheme"` \| `"token"`\> & `object`

The public base shape derived from an entry in the well-known "auth"
collection.

## Type declaration

### auth\_id

> **auth\_id**: `string`

A string representation of the ObjectId associated with this entry.

## Source

[lib/next-auth/db.ts:47](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/db.ts#L47)
