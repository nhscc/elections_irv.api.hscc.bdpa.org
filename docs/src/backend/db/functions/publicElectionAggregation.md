[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [src/backend/db](../README.md) / publicElectionAggregation

# Function: publicElectionAggregation()

> **publicElectionAggregation**(`tokenAttributeOwner`): `Document`[]

Returns a MongoDB aggregation pipeline that transforms internal elections
into public elections, each including the `owned` property. Prepend a `$match` or
similar stage to return only a subset of elections.

## Parameters

• **tokenAttributeOwner**: `string`

## Returns

`Document`[]

## Source

[src/backend/db.ts:214](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/src/backend/db.ts#L214)
