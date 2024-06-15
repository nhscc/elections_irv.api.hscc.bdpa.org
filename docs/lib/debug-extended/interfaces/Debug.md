[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/debug-extended](../README.md) / Debug

# Interface: Debug()

## Extended by

- [`ExtendedDebug`](ExtendedDebug.md)

> **Debug**(`namespace`): [`Debugger`](Debugger.md)

## Parameters

• **namespace**: `string`

## Returns

[`Debugger`](Debugger.md)

## Source

node\_modules/@types/debug/index.d.ts:8

## Properties

### coerce()

> **coerce**: (`val`) => `any`

#### Parameters

• **val**: `any`

#### Returns

`any`

#### Source

node\_modules/@types/debug/index.d.ts:9

***

### disable()

> **disable**: () => `string`

#### Returns

`string`

#### Source

node\_modules/@types/debug/index.d.ts:10

***

### enable()

> **enable**: (`namespaces`) => `void`

#### Parameters

• **namespaces**: `string`

#### Returns

`void`

#### Source

node\_modules/@types/debug/index.d.ts:11

***

### enabled()

> **enabled**: (`namespaces`) => `boolean`

#### Parameters

• **namespaces**: `string`

#### Returns

`boolean`

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

#### Source

node\_modules/@types/debug/index.d.ts:13

***

### formatters

> **formatters**: `Formatters`

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

#### Source

node\_modules/@types/debug/index.d.ts:23

***

### log()

> **log**: (...`args`) => `any`

#### Parameters

• ...**args**: `any`[]

#### Returns

`any`

#### Source

node\_modules/@types/debug/index.d.ts:14

***

### names

> **names**: `RegExp`[]

#### Source

node\_modules/@types/debug/index.d.ts:18

***

### selectColor()

> **selectColor**: (`namespace`) => `string` \| `number`

#### Parameters

• **namespace**: `string`

#### Returns

`string` \| `number`

#### Source

node\_modules/@types/debug/index.d.ts:15

***

### skips

> **skips**: `RegExp`[]

#### Source

node\_modules/@types/debug/index.d.ts:19
