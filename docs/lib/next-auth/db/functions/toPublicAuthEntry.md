[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/db](../README.md) / toPublicAuthEntry

# Function: toPublicAuthEntry()

> **toPublicAuthEntry**(`entry`): [`PublicAuthEntry`](../type-aliases/PublicAuthEntry.md)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption.

## Parameters

• **entry**: [`InternalAuthEntry`](../type-aliases/InternalAuthEntry.md)

## Returns

[`PublicAuthEntry`](../type-aliases/PublicAuthEntry.md)

## Source

[lib/next-auth/db.ts:86](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/db.ts#L86)
