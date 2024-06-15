[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-auth/token](../README.md) / deleteTokenById

# Function: deleteTokenById()

> **deleteTokenById**(`__namedParameters`): `Promise`\<`number`\>

Deletes a full token entry by its `auth_id` from the well-known "auth"
MongoDB collection.

Deleted tokens remain in the system but in a deactivated state. They cannot
be reactivated or otherwise interacted with after they are
deleted/deactivated.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.auth\_id**: `undefined` \| `string` \| `ObjectId`

## Returns

`Promise`\<`number`\>

## Source

[lib/next-auth/token.ts:628](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-auth/token.ts#L628)
