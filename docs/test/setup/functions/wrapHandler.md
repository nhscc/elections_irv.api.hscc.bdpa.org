[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [test/setup](../README.md) / wrapHandler

# Function: wrapHandler()

> **wrapHandler**(`pagesHandler`, `config`?): (`req`, `res`) => `Promise`\<`unknown`\>

This function wraps mock Next.js API handler functions so that they provide
the default (or a custom) API configuration object.

## Parameters

• **pagesHandler**: `NextApiHandler`

• **config?**: `PageConfig`

## Returns

`Function`

### Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

### Returns

`Promise`\<`unknown`\>

### config

> **config**: `PageConfig`

## Source

[test/setup.ts:61](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L61)
