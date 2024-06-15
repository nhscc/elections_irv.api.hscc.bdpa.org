[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/db](../README.md) / publicAuthEntryProjection

# Variable: publicAuthEntryProjection

> `const` **publicAuthEntryProjection**: `object`

A MongoDB cursor projection that transforms an internal auth entry (or
"token") into a public auth entry.

## Type declaration

### \_id

> **\_id**: `boolean` = `false`

### attributes

> **attributes**: `boolean` = `true`

### auth\_id

> **auth\_id**: `object`

### auth\_id.$toString

> **$toString**: `string` = `'$_id'`

### scheme

> **scheme**: `boolean` = `true`

### token

> **token**: `boolean` = `true`

## Source

[lib/next-auth/db.ts:66](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/db.ts#L66)
