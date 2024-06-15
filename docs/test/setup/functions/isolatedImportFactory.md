[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [test/setup](../README.md) / isolatedImportFactory

# Function: isolatedImportFactory()

> **isolatedImportFactory**\<`T`\>(`__namedParameters`): () => `T`

## Type parameters

• **T** = `unknown`

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.path**: `string`

Path to the module to import. Module resolution is handled by `require`.

• **\_\_namedParameters.useDefault?**: `boolean`

By default, only if `module.__esModule === true`, the default export will
be returned instead. Use `useDefault` to override this behavior in either
direction.

## Returns

`Function`

### Returns

`T`

## Source

[test/setup.ts:289](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L289)
