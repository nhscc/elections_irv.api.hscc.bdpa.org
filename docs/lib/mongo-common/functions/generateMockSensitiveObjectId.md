[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-common](../README.md) / generateMockSensitiveObjectId

# Function: generateMockSensitiveObjectId()

> **generateMockSensitiveObjectId**(): `ObjectId`

Calls `new ObjectId(...)` explicitly passing [mockDateNowMs](../../jest-mock-date/variables/mockDateNowMs.md) as the
inception time, which is the same thing that ObjectId does internally
with the real `Date.now`.

**This should only be used in modules with import side-effects that execute
before `useMockDateNow` is called** later in downstream code. If you are
unsure, you probably don't need to use this function and should just call
`new ObjectId()` instead.

The point of this function is to avoid race conditions when mocking parts of
the Date object that _sometimes_ resulted in _later_ calls to
ObjectId generating IDs that were _less_ than the IDs generated
_before_ it.

## Returns

`ObjectId`

## Source

[lib/mongo-common/index.ts:107](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-common/index.ts#L107)
