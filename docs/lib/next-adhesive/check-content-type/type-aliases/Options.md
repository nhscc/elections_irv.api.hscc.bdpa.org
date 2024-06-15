[**elections-irv.api.hscc.bdpa.org**](../../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../../README.md) / [lib/next-adhesive/check-content-type](../README.md) / Options

# Type alias: Options

> **Options**: `object`

## Type declaration

### allowedContentTypes?

> `optional` **allowedContentTypes**: [`AllowedContentTypesConfig`](AllowedContentTypesConfig.md) \| [`AllowedContentTypesPerMethodConfig`](AllowedContentTypesPerMethodConfig.md)

A string, a mapping, or an array of media types this endpoint is
allowed to receive.

If the string `"any"` is provided, any Content-Type header will be allowed,
including requests without a Content-Type header.

If the string `"none"` is provided, only requests without a Content-Type
header will be allowed. Similarly, `"none"` can also be included in the
array form to indicate that requests without a Content-Type header are
allowed in addition to those with a listed media type.

If a plain object is provided, it is assumed to be a mapping of HTTP method
keys and media type values where each value is one of the string `"any"` or
`"none"` or an array of media types / `"none"`s. In this form, these
constraints are applied per request method.

By default, _all_ requests using `POST`, `PUT`, and `PATCH` methods, or any
request _with_ a Content-Type header, _will always be rejected_ unless
configured otherwise. Requests _without_ a Content-Type header that are
using methods other than `POST`, `PUT`, and `PATCH` _will always be
allowed_ unless explicitly configured via mapping.

#### See

https://www.iana.org/assignments/media-types/media-types.xhtml

## Source

[lib/next-adhesive/check-content-type.ts:28](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/lib/next-adhesive/check-content-type.ts#L28)
