[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/jest-expect-matching-errors](../README.md) / expectExceptionsWithMatchingErrors

# Function: expectExceptionsWithMatchingErrors()

> **expectExceptionsWithMatchingErrors**\<`T`\>(`spec`, `errorFn`): `Promise`\<`void`\>

Maps each element of the `spec` array into a Jest expectation asserting that
`errorFn` either throws an error or rejects. If an assertion fails, a
helpful error message is thrown.

## Type parameters

• **T** *extends* [`unknown`, `string`][]

## Parameters

• **spec**: `T`

• **errorFn**

## Returns

`Promise`\<`void`\>

## Source

[lib/jest-expect-matching-errors/index.ts:15](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/jest-expect-matching-errors/index.ts#L15)
