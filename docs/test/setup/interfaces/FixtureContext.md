[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [test/setup](../README.md) / FixtureContext

# Interface: FixtureContext\<CustomOptions\>

## Extends

- `Partial`\<[`TestResultProvider`](TestResultProvider.md)\>.`Partial`\<[`TreeOutputProvider`](TreeOutputProvider.md)\>.`Partial`\<[`GitProvider`](GitProvider.md)\>

## Type parameters

• **CustomOptions** *extends* `Record`\<`string`, `unknown`\> = `object`

## Properties

### debug

> **debug**: [`Debugger`](../../../lib/debug-extended/interfaces/Debugger.md)

#### Source

[test/setup.ts:687](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L687)

***

### fileContents

> **fileContents**: `object`

#### Index signature

 \[`filePath`: `string`\]: `string`

#### Source

[test/setup.ts:686](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L686)

***

### git?

> `optional` **git**: `SimpleGit`

#### Inherited from

`Partial.git`

#### Source

[test/setup.ts:702](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L702)

***

### options

> **options**: [`FixtureOptions`](FixtureOptions.md) & `CustomOptions`

#### Source

[test/setup.ts:684](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L684)

***

### root

> **root**: `string`

#### Source

[test/setup.ts:682](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L682)

***

### testIdentifier

> **testIdentifier**: `string`

#### Source

[test/setup.ts:683](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L683)

***

### testResult?

> `optional` **testResult**: `object`

#### exitCode

> **exitCode**: `number`

#### stderr

> **stderr**: `string`

#### stdout

> **stdout**: `string`

#### Inherited from

`Partial.testResult`

#### Source

[test/setup.ts:692](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L692)

***

### treeOutput?

> `optional` **treeOutput**: `string`

#### Inherited from

`Partial.treeOutput`

#### Source

[test/setup.ts:697](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L697)

***

### using

> **using**: [`MockFixture`](MockFixture.md)\<[`FixtureContext`](FixtureContext.md)\<`object`\>\>[]

#### Source

[test/setup.ts:685](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L685)
