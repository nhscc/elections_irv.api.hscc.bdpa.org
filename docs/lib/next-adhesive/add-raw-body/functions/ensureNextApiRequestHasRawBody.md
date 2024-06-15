[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-adhesive/add-raw-body](../README.md) / ensureNextApiRequestHasRawBody

# Function: ensureNextApiRequestHasRawBody()

> **ensureNextApiRequestHasRawBody**(`req`): `req is WithRawBody<NextApiRequest>`

Type guard function similar to the `isNextApiRequestWithRawBody` type
predicate except an error is thrown if the request object cannot satisfy the
`WithRawBody` type constraint.

## Parameters

• **req**: `NextApiRequest`

## Returns

`req is WithRawBody<NextApiRequest>`

## Source

[lib/next-adhesive/add-raw-body.ts:65](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-adhesive/add-raw-body.ts#L65)
