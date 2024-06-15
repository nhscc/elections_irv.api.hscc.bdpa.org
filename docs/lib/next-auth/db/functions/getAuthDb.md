[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/db](../README.md) / getAuthDb

# Function: getAuthDb()

> **getAuthDb**(): `Promise`\<`Collection`\<[`InternalAuthEntry`](../type-aliases/InternalAuthEntry.md)\>\>

Return the well-known "auth" collection after calling [getDb](../../../mongo-schema/functions/getDb.md) on the
`'root'` database.

## Returns

`Promise`\<`Collection`\<[`InternalAuthEntry`](../type-aliases/InternalAuthEntry.md)\>\>

## Source

[lib/next-auth/db.ts:78](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/db.ts#L78)
