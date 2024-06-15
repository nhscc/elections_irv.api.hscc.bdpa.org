[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [src/backend/db](../README.md) / getElectionsDb

# Function: getElectionsDb()

> **getElectionsDb**(): `Promise`\<`Collection`\<[`InternalElection`](../type-aliases/InternalElection.md)\>\>

Return the well-known "elections" collection after calling [getDb](../../../../lib/mongo-schema/functions/getDb.md) on the
`'app'` database.

## Returns

`Promise`\<`Collection`\<[`InternalElection`](../type-aliases/InternalElection.md)\>\>

## Source

[src/backend/db.ts:49](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/src/backend/db.ts#L49)
