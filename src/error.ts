import { ErrorMessage as NamedErrorMessage } from 'named-app-errors';
import type { LiteralUnion } from 'type-fest';

export * from 'named-app-errors';

/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  ...NamedErrorMessage,
  DuplicateFieldValue: (property: string) =>
    `an item with that "${property}" already exists`,
  DuplicateArrayValue: (element: string) =>
    `duplicate array element "${element}" is not allowed`,
  InvalidLength: (
    property: string,
    actualLength: number,
    minLength: number,
    maxLength?: number | null
  ) =>
    `\`${property}\` has invalid length (${actualLength}). Length must be between ${minLength} and ${maxLength} (inclusive)`,
  InvalidFieldValue: (
    property: string,
    value?: string | null,
    validValues?: readonly string[]
  ) =>
    `\`${property}\` field has ${
      value
        ? `invalid or illegal value "${value}"`
        : 'a missing, invalid, or illegal value'
    }${validValues ? `. Valid values: ${validValues.join(', ')}` : ''}`,
  InvalidArrayValue: (
    property: string,
    value?: string,
    index?: number,
    validValues?: readonly string[]
  ) =>
    `the \`${property}\` array element ${value !== undefined ? ` "${value}"` : ''}${
      index !== undefined ? ` at index ${index}` : ''
    } is invalid or illegal${
      validValues ? `. Valid values: ${validValues.join(', ')}` : ''
    }`,
  InvalidObjectKey: (
    property: string,
    key?: string,
    validValues?: readonly string[]
  ) =>
    `the \`${property}\` object key \`${key}\` is invalid${validValues ? `. Valid keys: ${validValues.join(', ')}` : ''}`,
  InvalidObjectKeyValue: (
    property: string,
    value?: unknown,
    validValues?: readonly string[]
  ) =>
    `a \`${property}\` object key has ${
      value
        ? `invalid or illegal value "${String(value)}"`
        : 'a missing, invalid, or illegal value'
    }${validValues ? `. Valid values: ${validValues.join(', ')}` : ''}`,
  InvalidJSON: (property?: string) =>
    'encountered invalid JSON' + (property ? ` in property \`${property}\`` : ''),
  EmptyJSONBody: () => 'encountered unexpectedly empty JSON object in request body',
  InvalidNumberValue: (
    property: string,
    min: number | string,
    max: number | string | null,
    type: LiteralUnion<'number' | 'integer', string>,
    nullable = false,
    isArray = false
  ) =>
    `${isArray ? `each \`${property}\` element` : `\`${property}\``} must be a${
      type === 'integer' ? 'n integer' : type === 'number' ? ' number' : type
    } ${max ? `between ${min} and ${max} (inclusive)` : `>= ${min}`}${
      nullable ? ' or null' : ''
    }`,
  InvalidStringLength: (
    property: string,
    min: number | string,
    max: number | string | null,
    syntax: LiteralUnion<'string' | 'alphanumeric' | 'hexadecimal' | 'bytes', string>,
    nullable = false,
    isArray = false
  ) =>
    `${isArray ? `each \`${property}\` element` : `\`${property}\``} must be a${
      syntax === 'alphanumeric'
        ? 'n alphanumeric'
        : syntax !== 'bytes'
          ? ` ${syntax}`
          : ''
    } ${
      max
        ? `${syntax !== 'string' ? 'string ' : ''}between ${min} and ${max} ${
            syntax === 'bytes' ? 'byte' : 'character'
          }s (inclusive)`
        : `${min} ${syntax === 'bytes' ? 'byte' : 'character'} string`
    }${nullable ? ' or null' : ''}`,
  InvalidObjectId: (id: unknown) => `invalid ObjectId "${id}"`,
  UnknownField: (property: string) =>
    `encountered unknown or illegal field \`${property}\``,
  UnknownSpecifier: (property: string, sub = false) =>
    `encountered unknown or illegal ${sub ? 'sub-' : ''}specifier \`${property}\``,
  InvalidSpecifierValueType: (property: string, type: string, sub = false) =>
    `\`${property}\` has invalid ${
      sub ? 'sub-' : ''
    }specifier value type (must be ${type})`,
  InvalidRegexString: (property: string) =>
    `\`${property}\` has invalid or illegal regex value`,
  BadProvenanceToken: () => 'invalid provenance token attribute owner',
  InvariantViolation: (invariant: string) => `invariant violated: ${invariant}`,
  IllegalOperation: () =>
    'this user is not authorized to execute operations on this item',
  // 'navLinks', 0, 5, 'navigation links'
  TooMany: (resource?: string, max?: number | string) => {
    return `resource limit reached${resource ? `: ${resource}` : ''}${
      max !== undefined ? ` (exceeded maximum of ${max})` : ''
    }`;
  }
};
