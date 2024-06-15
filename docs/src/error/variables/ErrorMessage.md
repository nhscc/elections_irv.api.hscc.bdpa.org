[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [src/error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

A collection of possible error and warning messages.

## Type declaration

### AppValidationFailure()

> **AppValidationFailure**: () => `string`

#### Returns

`string`

### AuthFailure()

> **AuthFailure**: () => `string`

#### Returns

`string`

### BadProvenanceToken()

> **BadProvenanceToken**: () => `string`

#### Returns

`string`

### ClientValidationFailure()

> **ClientValidationFailure**: () => `string`

#### Returns

`string`

### DuplicateArrayValue()

> **DuplicateArrayValue**: (`element`) => `string`

#### Parameters

• **element**: `string`

#### Returns

`string`

### DuplicateFieldValue()

> **DuplicateFieldValue**: (`property`) => `string`

#### Parameters

• **property**: `string`

#### Returns

`string`

### EmptyJSONBody()

> **EmptyJSONBody**: () => `string`

#### Returns

`string`

### GuruMeditation()

> **GuruMeditation**: () => `string`

#### Returns

`string`

### HttpFailure()

> **HttpFailure**: (`error`?) => `string`

#### Parameters

• **error?**: `string`

#### Returns

`string`

### HttpSubFailure()

> **HttpSubFailure**: (`error`, `statusCode`) => `string`

#### Parameters

• **error**: `null` \| `string`

• **statusCode**: `number`

#### Returns

`string`

### IllegalOperation()

> **IllegalOperation**: () => `string`

#### Returns

`string`

### InvalidAppConfiguration()

> **InvalidAppConfiguration**: (`details`?) => `string`

#### Parameters

• **details?**: `string`

#### Returns

`string`

### InvalidAppEnvironment()

> **InvalidAppEnvironment**: (`details`?) => `string`

#### Parameters

• **details?**: `string`

#### Returns

`string`

### InvalidArrayValue()

> **InvalidArrayValue**: (`property`, `value`?, `index`?, `validValues`?) => `string`

#### Parameters

• **property**: `string`

• **value?**: `string`

• **index?**: `number`

• **validValues?**: readonly `string`[]

#### Returns

`string`

### InvalidClientConfiguration()

> **InvalidClientConfiguration**: (`details`?) => `string`

#### Parameters

• **details?**: `string`

#### Returns

`string`

### InvalidFieldValue()

> **InvalidFieldValue**: (`property`, `value`?, `validValues`?) => `string`

#### Parameters

• **property**: `string`

• **value?**: `null` \| `string`

• **validValues?**: readonly `string`[]

#### Returns

`string`

### InvalidItem()

> **InvalidItem**: (`item`, `itemName`) => `string`

#### Parameters

• **item**: `unknown`

• **itemName**: `string`

#### Returns

`string`

### InvalidJSON()

> **InvalidJSON**: (`property`?) => `string`

#### Parameters

• **property?**: `string`

#### Returns

`string`

### InvalidLength()

> **InvalidLength**: (`property`, `actualLength`, `minLength`, `maxLength`?) => `string`

#### Parameters

• **property**: `string`

• **actualLength**: `number`

• **minLength**: `number`

• **maxLength?**: `null` \| `number`

#### Returns

`string`

### InvalidNumberValue()

> **InvalidNumberValue**: (`property`, `min`, `max`, `type`, `nullable`, `isArray`) => `string`

#### Parameters

• **property**: `string`

• **min**: `string` \| `number`

• **max**: `null` \| `string` \| `number`

• **type**: `LiteralUnion`\<`"number"` \| `"integer"`, `string`\>

• **nullable**: `boolean`= `false`

• **isArray**: `boolean`= `false`

#### Returns

`string`

### InvalidObjectId()

> **InvalidObjectId**: (`id`) => `string`

#### Parameters

• **id**: `unknown`

#### Returns

`string`

### InvalidObjectKey()

> **InvalidObjectKey**: (`property`, `key`?, `validValues`?) => `string`

#### Parameters

• **property**: `string`

• **key?**: `string`

• **validValues?**: readonly `string`[]

#### Returns

`string`

### InvalidObjectKeyValue()

> **InvalidObjectKeyValue**: (`property`, `value`?, `validValues`?) => `string`

#### Parameters

• **property**: `string`

• **value?**: `unknown`

• **validValues?**: readonly `string`[]

#### Returns

`string`

### InvalidRegexString()

> **InvalidRegexString**: (`property`) => `string`

#### Parameters

• **property**: `string`

#### Returns

`string`

### InvalidSecret()

> **InvalidSecret**: (`secretType`) => `string`

#### Parameters

• **secretType**: `string`

#### Returns

`string`

### InvalidSpecifierValueType()

> **InvalidSpecifierValueType**: (`property`, `type`, `sub`) => `string`

#### Parameters

• **property**: `string`

• **type**: `string`

• **sub**: `boolean`= `false`

#### Returns

`string`

### InvalidStringLength()

> **InvalidStringLength**: (`property`, `min`, `max`, `syntax`, `nullable`, `isArray`) => `string`

#### Parameters

• **property**: `string`

• **min**: `string` \| `number`

• **max**: `null` \| `string` \| `number`

• **syntax**: `LiteralUnion`\<`"string"` \| `"alphanumeric"` \| `"hexadecimal"` \| `"bytes"`, `string`\>

• **nullable**: `boolean`= `false`

• **isArray**: `boolean`= `false`

#### Returns

`string`

### InvariantViolation()

> **InvariantViolation**: (`invariant`) => `string`

#### Parameters

• **invariant**: `string`

#### Returns

`string`

### ItemNotFound()

> **ItemNotFound**: (`item`, `itemName`) => `string`

#### Parameters

• **item**: `unknown`

• **itemName**: `string`

#### Returns

`string`

### ItemOrItemsNotFound()

> **ItemOrItemsNotFound**: (`itemsName`) => `string`

#### Parameters

• **itemsName**: `string`

#### Returns

`string`

### NotAuthenticated()

> **NotAuthenticated**: () => `string`

#### Returns

`string`

### NotAuthorized()

> **NotAuthorized**: () => `string`

#### Returns

`string`

### NotFound()

> **NotFound**: () => `string`

#### Returns

`string`

### NotImplemented()

> **NotImplemented**: () => `string`

#### Returns

`string`

### TooMany()

> **TooMany**: (`resource`?, `max`?) => `string`

#### Parameters

• **resource?**: `string`

• **max?**: `string` \| `number`

#### Returns

`string`

### UnknownField()

> **UnknownField**: (`property`) => `string`

#### Parameters

• **property**: `string`

#### Returns

`string`

### UnknownSpecifier()

> **UnknownSpecifier**: (`property`, `sub`) => `string`

#### Parameters

• **property**: `string`

• **sub**: `boolean`= `false`

#### Returns

`string`

### ValidationFailure()

> **ValidationFailure**: () => `string`

#### Returns

`string`

## Source

[src/error.ts:10](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/src/error.ts#L10)
