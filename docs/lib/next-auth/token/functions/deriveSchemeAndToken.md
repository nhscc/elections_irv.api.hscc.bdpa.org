[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / deriveSchemeAndToken

# Function: deriveSchemeAndToken()

## deriveSchemeAndToken(__namedParameters)

> **deriveSchemeAndToken**(`__namedParameters`): `Promise`\<[`BearerToken`](../type-aliases/BearerToken.md)\>

Derives a token and scheme from an authentication string (such as an
Authorization header). **Does not check the database for token existence**.
Throws on invalid/missing authentication string.

Throws [InvalidSecretError](../../../../src/error/classes/InvalidSecretError.md) if invalid/missing data is provided.

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.allowedSchemes?**: `"bearer"` \| `"bearer"`[]

Accepted authentication schemes. By default, all schemes are accepted.

• **\_\_namedParameters.authString?**: `string`

The authentication string used to derive a token and scheme.

### Returns

`Promise`\<[`BearerToken`](../type-aliases/BearerToken.md)\>

### Source

[lib/next-auth/token.ts:263](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L263)

## deriveSchemeAndToken(__namedParameters)

> **deriveSchemeAndToken**(`__namedParameters`): `Promise`\<[`BearerToken`](../type-aliases/BearerToken.md)\>

Returns the token and scheme passed via `authData` if the token and scheme
are valid. **Does not check the database for token existence**. Throws on
invalid/missing token/scheme.

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.allowedSchemes?**: `"bearer"` \| `"bearer"`[]

Accepted authentication schemes. By default, all schemes are accepted.

• **\_\_namedParameters.authData?**: `Partial`\<`object`\>

The data that will be verified and returned as-is.

### Returns

`Promise`\<[`BearerToken`](../type-aliases/BearerToken.md)\>

### Source

[lib/next-auth/token.ts:281](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L281)
