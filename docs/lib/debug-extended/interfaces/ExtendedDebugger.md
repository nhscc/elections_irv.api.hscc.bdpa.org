[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/debug-extended](../README.md) / ExtendedDebugger

# Interface: ExtendedDebugger()

A Debugger interface extended with convenience methods.

## Extends

- [`Debugger`](Debugger.md)

> **ExtendedDebugger**(`formatter`, ...`args`): `void`

## Parameters

• **formatter**: `any`

• ...**args**: `any`[]

## Returns

`void`

## Source

[lib/debug-extended/index.ts:16](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L16)

## Properties

### color

> **color**: `string`

#### Inherited from

[`Debugger`](Debugger.md).[`color`](Debugger.md#color)

#### Source

node\_modules/@types/debug/index.d.ts:42

***

### destroy()

> **destroy**: () => `boolean`

#### Returns

`boolean`

#### Inherited from

[`Debugger`](Debugger.md).[`destroy`](Debugger.md#destroy)

#### Source

node\_modules/@types/debug/index.d.ts:47

***

### diff

> **diff**: `number`

#### Inherited from

[`Debugger`](Debugger.md).[`diff`](Debugger.md#diff)

#### Source

node\_modules/@types/debug/index.d.ts:43

***

### enabled

> **enabled**: `boolean`

#### Inherited from

[`Debugger`](Debugger.md).[`enabled`](Debugger.md#enabled)

#### Source

node\_modules/@types/debug/index.d.ts:44

***

### error

> **error**: [`Debugger`](Debugger.md)

#### Source

[lib/debug-extended/index.ts:17](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L17)

***

### extend()

> **extend**: (...`args`) => [`ExtendedDebugger`](ExtendedDebugger.md)

#### Parameters

• ...**args**: [`string`, `string`]

#### Returns

[`ExtendedDebugger`](ExtendedDebugger.md)

#### Overrides

[`Debugger`](Debugger.md).[`extend`](Debugger.md#extend)

#### Source

[lib/debug-extended/index.ts:19](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L19)

***

### log()

> **log**: (...`args`) => `any`

#### Parameters

• ...**args**: `any`[]

#### Returns

`any`

#### Inherited from

[`Debugger`](Debugger.md).[`log`](Debugger.md#log)

#### Source

node\_modules/@types/debug/index.d.ts:45

***

### namespace

> **namespace**: `string`

#### Inherited from

[`Debugger`](Debugger.md).[`namespace`](Debugger.md#namespace)

#### Source

node\_modules/@types/debug/index.d.ts:46

***

### warn

> **warn**: [`Debugger`](Debugger.md)

#### Source

[lib/debug-extended/index.ts:18](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/debug-extended/index.ts#L18)
