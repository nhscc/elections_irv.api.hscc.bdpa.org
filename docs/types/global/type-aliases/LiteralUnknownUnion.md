[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [types/global](../README.md) / LiteralUnknownUnion

# Type alias: LiteralUnknownUnion\<LiteralType\>

> **LiteralUnknownUnion**\<`LiteralType`\>: `LiteralType` \| `unknown` & `Record`\<`never`, `never`\> \| `null` \| `undefined`

An extension of type-fest's LiteralUnion that functions with
`unknown` as `BaseType`.

The point of this function is to make intellisense suggestions available for
parameters that expect a certain shape but initially accept any (i.e.
`unknown`) shape. For example, a function that accepts user input where said
function asserts its input parameter is of a specific type, even though the
argument passed through that parameter could technically be of any type.

## Type parameters

• **LiteralType**

## Source

[types/global.ts:16](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/types/global.ts#L16)
