[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [lib/mongo-schema](../README.md) / InternalMemory

# Type alias: InternalMemory

> **InternalMemory**: `object`

An internal cache of connection, server schema, and database state.

## Type declaration

### client

> **client**: `MongoClient` \| `null`

Memoized MongoDB driver client connection.

### databases

> **databases**: `Record`\<`string`, `Db`\>

Memoized MongoDB driver Database instances.

### schema

> **schema**: [`DbSchema`](DbSchema.md) \| `null`

Memoized resolved database schemas and aliases.

## Source

[lib/mongo-schema/index.ts:19](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/mongo-schema/index.ts#L19)
