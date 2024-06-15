[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/constants](../README.md) / getConfig

# Function: getConfig()

> **getConfig**(): `object`

## Returns

`object`

### resultsPerPage

> **resultsPerPage**: `number` = `100`

Used as the MongoDb query resultset limit. The API will never return
more JSON objects than this number.

If this number is not positive, behavior is undefined.

## Source

[lib/next-auth/constants.ts:2](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/constants.ts#L2)
