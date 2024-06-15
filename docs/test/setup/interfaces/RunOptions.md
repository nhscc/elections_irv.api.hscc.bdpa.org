[**elections-irv.api.hscc.bdpa.org**](../../../README.md) • **Docs**

***

[elections-irv.api.hscc.bdpa.org](../../../README.md) / [test/setup](../README.md) / RunOptions

# Interface: RunOptions

## Extends

- `Options`

## Properties

### all?

> `optional` `readonly` **all**: `boolean`

Add an `.all` property on the promise and the resolved value. The property contains the output of the process with `stdout` and `stderr` interleaved.

#### Default

```ts
false
```

#### Inherited from

`execa.Options.all`

#### Source

node\_modules/execa/index.d.ts:96

***

### argv0?

> `optional` `readonly` **argv0**: `string`

Explicitly set the value of `argv[0]` sent to the child process. This will be set to `command` or `file` if not specified.

#### Inherited from

`execa.Options.argv0`

#### Source

node\_modules/execa/index.d.ts:129

***

### buffer?

> `optional` `readonly` **buffer**: `boolean`

Buffer the output from the spawned process. When set to `false`, you must read the output of `stdout` and `stderr` (or `all` if the `all` option is `true`). Otherwise the returned promise will not be resolved/rejected.

If the spawned process fails, `error.stdout`, `error.stderr`, and `error.all` will contain the buffered data.

#### Default

```ts
true
```

#### Inherited from

`execa.Options.buffer`

#### Source

node\_modules/execa/index.d.ts:61

***

### cleanup?

> `optional` `readonly` **cleanup**: `boolean`

Kill the spawned process when the parent process exits unless either:
	- the spawned process is [`detached`](https://nodejs.org/api/child_process.html#child_process_options_detached)
	- the parent process is terminated abruptly, for example, with `SIGKILL` as opposed to `SIGTERM` or a normal exit

#### Default

```ts
true
```

#### Inherited from

`execa.Options.cleanup`

#### Source

node\_modules/execa/index.d.ts:23

***

### cwd?

> `optional` `readonly` **cwd**: `string`

Current working directory of the child process.

#### Default

```ts
process.cwd()
```

#### Inherited from

`execa.Options.cwd`

#### Source

node\_modules/execa/index.d.ts:117

***

### detached?

> `optional` `readonly` **detached**: `boolean`

Prepare child to run independently of its parent process. Specific behavior [depends on the platform](https://nodejs.org/api/child_process.html#child_process_options_detached).

#### Default

```ts
false
```

#### Inherited from

`execa.Options.detached`

#### Source

node\_modules/execa/index.d.ts:156

***

### encoding?

> `optional` `readonly` **encoding**: `string`

Specify the character encoding used to decode the `stdout` and `stderr` output. If set to `null`, then `stdout` and `stderr` will be a `Buffer` instead of a string.

#### Default

```ts
'utf8'
```

#### Inherited from

`execa.Options.encoding`

#### Source

node\_modules/execa/index.d.ts:185

***

### env?

> `optional` `readonly` **env**: `ProcessEnv`

Environment key-value pairs. Extends automatically from `process.env`. Set `extendEnv` to `false` if you don't want this.

#### Default

```ts
process.env
```

#### Inherited from

`execa.Options.env`

#### Source

node\_modules/execa/index.d.ts:124

***

### execPath?

> `optional` `readonly` **execPath**: `string`

Path to the Node.js executable to use in child processes.

This can be either an absolute path or a path relative to the `cwd` option.

Requires `preferLocal` to be `true`.

For example, this can be used together with [`get-node`](https://github.com/ehmicky/get-node) to run a specific Node.js version in a child process.

#### Default

```ts
process.execPath
```

#### Inherited from

`execa.Options.execPath`

#### Source

node\_modules/execa/index.d.ts:52

***

### extendEnv?

> `optional` `readonly` **extendEnv**: `boolean`

Set to `false` if you don't want to extend the environment variables when providing the `env` property.

#### Default

```ts
true
```

#### Inherited from

`execa.Options.extendEnv`

#### Source

node\_modules/execa/index.d.ts:110

***

### gid?

> `optional` `readonly` **gid**: `number`

Sets the group identity of the process.

#### Inherited from

`execa.Options.gid`

#### Source

node\_modules/execa/index.d.ts:166

***

### input?

> `optional` `readonly` **input**: `string` \| `Readable` \| `Buffer`

Write some input to the `stdin` of your binary.

#### Inherited from

`execa.Options.input`

#### Source

node\_modules/execa/index.d.ts:227

***

### killSignal?

> `optional` `readonly` **killSignal**: `string` \| `number`

Signal value to be used when the spawned process will be killed.

#### Default

```ts
'SIGTERM'
```

#### Inherited from

`execa.Options.killSignal`

#### Source

node\_modules/execa/index.d.ts:206

***

### localDir?

> `optional` `readonly` **localDir**: `string`

Preferred path to find locally installed binaries in (use with `preferLocal`).

#### Default

```ts
process.cwd()
```

#### Inherited from

`execa.Options.localDir`

#### Source

node\_modules/execa/index.d.ts:39

***

### maxBuffer?

> `optional` `readonly` **maxBuffer**: `number`

Largest amount of data in bytes allowed on `stdout` or `stderr`. Default: 100 MB.

#### Default

```ts
100_000_000
```

#### Inherited from

`execa.Options.maxBuffer`

#### Source

node\_modules/execa/index.d.ts:199

***

### preferLocal?

> `optional` `readonly` **preferLocal**: `boolean`

Prefer locally installed binaries when looking for a binary to execute.

If you `$ npm install foo`, you can then `execa('foo')`.

#### Default

```ts
false
```

#### Inherited from

`execa.Options.preferLocal`

#### Source

node\_modules/execa/index.d.ts:32

***

### reject?

> `optional` **reject**: `boolean`

Setting this to `true` rejects the promise instead of resolving it with the error.

#### Default

```ts
false
```

#### Overrides

`execa.Options.reject`

#### Source

[test/setup.ts:626](https://github.com/Xunnamius/elections_irv.api.hscc.bdpa.org/blob/c917ea60595d63d322e4038beb12d08f7d64cdd2/test/setup.ts#L626)

***

### serialization?

> `optional` `readonly` **serialization**: `"json"` \| `"advanced"`

Specify the kind of serialization used for sending messages between processes when using the `stdio: 'ipc'` option or `execa.node()`:
	- `json`: Uses `JSON.stringify()` and `JSON.parse()`.
	- `advanced`: Uses [`v8.serialize()`](https://nodejs.org/api/v8.html#v8_v8_serialize_value)

Requires Node.js `13.2.0` or later.

[More info.](https://nodejs.org/api/child_process.html#child_process_advanced_serialization)

#### Default

```ts
'json'
```

#### Inherited from

`execa.Options.serialization`

#### Source

node\_modules/execa/index.d.ts:149

***

### shell?

> `optional` `readonly` **shell**: `string` \| `boolean`

If `true`, runs `command` inside of a shell. Uses `/bin/sh` on UNIX and `cmd.exe` on Windows. A different shell can be specified as a string. The shell should understand the `-c` switch on UNIX or `/d /s /c` on Windows.

We recommend against using this option since it is:
- not cross-platform, encouraging shell-specific syntax.
- slower, because of the additional shell interpretation.
- unsafe, potentially allowing command injection.

#### Default

```ts
false
```

#### Inherited from

`execa.Options.shell`

#### Source

node\_modules/execa/index.d.ts:178

***

### stderr?

> `optional` `readonly` **stderr**: `StdioOption`

Same options as [`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### Default

```ts
'pipe'
```

#### Inherited from

`execa.Options.stderr`

#### Source

node\_modules/execa/index.d.ts:82

***

### stdin?

> `optional` `readonly` **stdin**: `StdioOption`

Same options as [`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### Default

```ts
'pipe'
```

#### Inherited from

`execa.Options.stdin`

#### Source

node\_modules/execa/index.d.ts:68

***

### stdio?

> `optional` `readonly` **stdio**: `"pipe"` \| `"ignore"` \| `"inherit"` \| readonly `StdioOption`[]

Child's [stdio](https://nodejs.org/api/child_process.html#child_process_options_stdio) configuration.

#### Default

```ts
'pipe'
```

#### Inherited from

`execa.Options.stdio`

#### Source

node\_modules/execa/index.d.ts:136

***

### stdout?

> `optional` `readonly` **stdout**: `StdioOption`

Same options as [`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### Default

```ts
'pipe'
```

#### Inherited from

`execa.Options.stdout`

#### Source

node\_modules/execa/index.d.ts:75

***

### stripFinalNewline?

> `optional` `readonly` **stripFinalNewline**: `boolean`

Strip the final [newline character](https://en.wikipedia.org/wiki/Newline) from the output.

#### Default

```ts
true
```

#### Inherited from

`execa.Options.stripFinalNewline`

#### Source

node\_modules/execa/index.d.ts:103

***

### timeout?

> `optional` `readonly` **timeout**: `number`

If `timeout` is greater than `0`, the parent will send the signal identified by the `killSignal` property (the default is `SIGTERM`) if the child runs longer than `timeout` milliseconds.

#### Default

```ts
0
```

#### Inherited from

`execa.Options.timeout`

#### Source

node\_modules/execa/index.d.ts:192

***

### uid?

> `optional` `readonly` **uid**: `number`

Sets the user identity of the process.

#### Inherited from

`execa.Options.uid`

#### Source

node\_modules/execa/index.d.ts:161

***

### windowsHide?

> `optional` `readonly` **windowsHide**: `boolean`

On Windows, do not create a new console window. Please note this also prevents `CTRL-C` [from working](https://github.com/nodejs/node/issues/29837) on Windows.

#### Default

```ts
true
```

#### Inherited from

`execa.Options.windowsHide`

#### Source

node\_modules/execa/index.d.ts:220

***

### windowsVerbatimArguments?

> `optional` `readonly` **windowsVerbatimArguments**: `boolean`

If `true`, no quoting or escaping of arguments is done on Windows. Ignored on other platforms. This is set to `true` automatically when the `shell` option is `true`.

#### Default

```ts
false
```

#### Inherited from

`execa.Options.windowsVerbatimArguments`

#### Source

node\_modules/execa/index.d.ts:213
