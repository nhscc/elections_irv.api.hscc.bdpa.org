[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/debug-extended](../README.md) / ExtendedDebug

# Interface: ExtendedDebug()

A Debug factory interface that returns `ExtendedDebugger` instances.

## Extends

- [`Debug`](Debug.md)

> **ExtendedDebug**(...`args`): [`ExtendedDebugger`](ExtendedDebugger.md)

## Parameters

• ...**args**: [`string`]

## Returns

[`ExtendedDebugger`](ExtendedDebugger.md)

## Source

[lib/debug-extended/index.ts:10](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L10)

> **ExtendedDebug**(`namespace`): [`Debugger`](Debugger.md)

## Parameters

• **namespace**: `string`

## Returns

[`Debugger`](Debugger.md)

## Source

[lib/debug-extended/index.ts:9](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L9)

## Properties

### coerce()

> **coerce**: (`val`) => `any`

#### Parameters

• **val**: `any`

#### Returns

`any`

#### Inherited from

[`Debug`](Debug.md).[`coerce`](Debug.md#coerce)

#### Source

node\_modules/@types/debug/index.d.ts:9

***

### disable()

> **disable**: () => `string`

#### Returns

`string`

#### Inherited from

[`Debug`](Debug.md).[`disable`](Debug.md#disable)

#### Source

node\_modules/@types/debug/index.d.ts:10

***

### enable()

> **enable**: (`namespaces`) => `void`

#### Parameters

• **namespaces**: `string`

#### Returns

`void`

#### Inherited from

[`Debug`](Debug.md).[`enable`](Debug.md#enable)

#### Source

node\_modules/@types/debug/index.d.ts:11

***

### enabled()

> **enabled**: (`namespaces`) => `boolean`

#### Parameters

• **namespaces**: `string`

#### Returns

`boolean`

#### Inherited from

[`Debug`](Debug.md).[`enabled`](Debug.md#enabled)

#### Source

node\_modules/@types/debug/index.d.ts:12

***

### formatArgs()

> **formatArgs**: (`this`, `args`) => `void`

#### Parameters

• **this**: [`Debugger`](Debugger.md)

• **args**: `any`[]

#### Returns

`void`

#### Inherited from

[`Debug`](Debug.md).[`formatArgs`](Debug.md#formatargs)

#### Source

node\_modules/@types/debug/index.d.ts:13

***

### formatters

> **formatters**: `Formatters`

#### Inherited from

[`Debug`](Debug.md).[`formatters`](Debug.md#formatters)

#### Source

node\_modules/@types/debug/index.d.ts:21

***

### humanize()

> **humanize**: (`value`, `options`?) => `string`(`value`) => `number`

Short/Long format for `value`.

#### Parameters

• **value**: `number`

• **options?**

• **options.long?**: `boolean`

#### Returns

`string`

Parse the given `value` and return milliseconds.

#### Parameters

• **value**: `string`

#### Returns

`number`

#### Inherited from

[`Debug`](Debug.md).[`humanize`](Debug.md#humanize)

#### Source

node\_modules/@types/debug/index.d.ts:16

***

### inspectOpts?

> `optional` **inspectOpts**: `object`

#### colors?

> `optional` **colors**: `null` \| `number` \| `boolean`

#### depth?

> `optional` **depth**: `null` \| `number` \| `boolean`

#### hideDate?

> `optional` **hideDate**: `null` \| `number` \| `boolean`

#### showHidden?

> `optional` **showHidden**: `null` \| `number` \| `boolean`

#### Inherited from

[`Debug`](Debug.md).[`inspectOpts`](Debug.md#inspectopts)

#### Source

node\_modules/@types/debug/index.d.ts:23

***

### log()

> **log**: (...`args`) => `any`

#### Parameters

• ...**args**: `any`[]

#### Returns

`any`

#### Inherited from

[`Debug`](Debug.md).[`log`](Debug.md#log)

#### Source

node\_modules/@types/debug/index.d.ts:14

***

### names

> **names**: `RegExp`[]

#### Inherited from

[`Debug`](Debug.md).[`names`](Debug.md#names)

#### Source

node\_modules/@types/debug/index.d.ts:18

***

### selectColor()

> **selectColor**: (`namespace`) => `string` \| `number`

#### Parameters

• **namespace**: `string`

#### Returns

`string` \| `number`

#### Inherited from

[`Debug`](Debug.md).[`selectColor`](Debug.md#selectcolor)

#### Source

node\_modules/@types/debug/index.d.ts:15

***

### skips

> **skips**: `RegExp`[]

#### Inherited from

[`Debug`](Debug.md).[`skips`](Debug.md#skips)

#### Source

node\_modules/@types/debug/index.d.ts:19
