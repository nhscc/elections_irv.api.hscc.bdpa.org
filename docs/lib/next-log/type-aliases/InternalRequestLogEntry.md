[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/next-log](../README.md) / InternalRequestLogEntry

# Type alias: InternalRequestLogEntry

> **InternalRequestLogEntry**: `WithId`\<`object`\>

The shape of an entry in the well-known "request log" collection.

## Type declaration

### createdAt

> **createdAt**: `UnixEpochMs`

### durationMs

> **durationMs**: `number`

### endpoint

> **endpoint**: `string` \| `null`

### header

> **header**: `string` \| `null`

### ip

> **ip**: `string` \| `null`

### method

> **method**: `string` \| `null`

### resStatusCode

> **resStatusCode**: `HttpStatusCode`

### route

> **route**: `string` \| `null`

## Source

[lib/next-log/index.ts:13](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-log/index.ts#L13)
