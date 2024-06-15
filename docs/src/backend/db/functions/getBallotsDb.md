[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [src/backend/db](../README.md) / getBallotsDb

# Function: getBallotsDb()

> **getBallotsDb**(): `Promise`\<`Collection`\<[`InternalBallot`](../type-aliases/InternalBallot.md)\>\>

Return the well-known "ballots" collection after calling [getDb](../../../../lib/mongo-schema/functions/getDb.md) on the
`'app'` database.

## Returns

`Promise`\<`Collection`\<[`InternalBallot`](../type-aliases/InternalBallot.md)\>\>

## Source

[src/backend/db.ts:57](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/src/backend/db.ts#L57)
