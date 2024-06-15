[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/jest-mock-date](../README.md) / useMockDateNow

# Function: useMockDateNow()

> **useMockDateNow**(`options`?): `void`

Sets up a Jest spy on the `Date` object's `now` method such that it returns
`mockNow` or `mockDateNowMs` (default) rather than the actual date. If you
want to restore the mock, you will have to do so manually (or use Jest
configuration to do so automatically).

This is useful when testing against/playing with dummy data containing values
derived from the current time (i.e. unix epoch).

## Parameters

• **options?**

• **options.mockNow?**: `number`

## Returns

`void`

## Source

[lib/jest-mock-date/index.ts:15](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/jest-mock-date/index.ts#L15)
