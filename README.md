node-copy-paste-2
=================

A command line utility that allows read/write (i.e copy/paste) access to the system clipboard. It wraps:
- [pbcopy/pbpaste](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/pbcopy.1.htmlhttps://coderwall.com/p/osbzzq/copy-files-to-clipboard-using-command-line-on-osx) for OSX
- [xclip](https://github.com/astrand/xclip) for Linux, FreeBSD, and OpenBSD
- [clip](https://www.labnol.org/software/copy-command-output-to-clipboard/2506/) for Windows

Currently works with node.js v8+ with __text only__.

The text is put in your system's clipboard, if any character in it are not supported by your system's default character set, the result won't be pretty.
The character sets are:
- UTF16_LE: for Windows
- UTF8: for all other systems

## History

It was copied from [node-copy-paste](https://github.com/xavi-/node-copy-paste) because [this security-related PR](https://github.com/xavi-/node-copy-paste/pull/64) was never merged.

I was first willing to only make a simple fix and eventually remove this repository when my PR was merged but after a bit of fiddling I found myself re-writing most of the code.

The differences with [node-copy-paste](https://github.com/xavi-/node-copy-paste)
- upgrade the code to newer JS syntax => now runs on NodeJS 8+
- remove deprecated methods (silent, noConflict)
- switch from callbacks to async/await
- upgrade all dependencies to their latest versions
- fix xclip API misuse that lead to node never exiting properly
- change the API significantly to have better control over encoding matters
- remove the method `global` as globals are evil
- the Windows code has not changed a bit (Windows ain't my cup of tee) and all credits for Windows-related code should go to [@xavi-](https://github.com/xavi-)

### Info

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Status

[![Dependency Status](https://david-dm.org/quilicicf/node-copy-paste-2.svg)](https://david-dm.org/quilicicf/node-copy-paste-2)
[![Known Vulnerabilities](https://snyk.io/test/github/quilicicf/node-copy-paste-2/badge.svg)](https://snyk.io/test/github/quilicicf/node-copy-paste-2)
[![Build status](https://travis-ci.org/quilicicf/node-copy-paste-2.svg?branch=master)](https://travis-ci.org/quilicicf/node-copy-paste-2/builds)

### Static analysis

[![Maintainability](https://api.codeclimate.com/v1/badges/2bf960c70aaa4b2cd265/maintainability)](https://codeclimate.com/github/quilicicf/node-copy-paste-2/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/35066131d7674dd48c450305faabd632)](https://www.codacy.com/app/quilicicf/node-copy-paste-2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=quilicicf/node-copy-paste-2&amp;utm_campaign=Badge_Grade)

## The API

When `require("copy-paste-2")` is executed, an object with the following properties is returned:

- `encodings`: A map of all the encodings that are supported.
- `copy({ input: stream|buffer|string|array|object, inputEncoding: string })`: Asynchronously replaces the current content of the clipboard with the input.
  - `input`: In case the input is an array or object, the node method `require('util').inspect(object, { depth: null })` is used to serialize it. If it is a stream, it should be a raw stream and the encoding should be specified in `inputEncoding`.
  - `inputEncoding`: The encoding of the input. The default is UTF-8, use the values in `encoding` (and benefit from syntactic completion), example: `copy({ input: 'toto', inputEncoding: encodings.UTF16_LE })`.
- `paste()`: Asynchronously returns the current contents of the system clip board.

## Example

```js
const ncp = require("copy-paste");

// With async/await
const myBusinessMethod = async (someText) => {
  const copied = await ncp.copy({ input: someText });
  // Go on with your business logic
}

// With promises
ncp.copy({ input: 'some text' })
  .then((copiedText) => {
    // Your business logic here
  });
```

## Install

```
npm install copy-paste-2
```

## TODO list

- [x] Install code quality/security tools
- [x] Add post-install script to check that dependencies are installed
- [x] Test more thoroughly, currently only text copies are tested. Not objects, arrays, streams...
- [ ] Properly test on all platforms (currently only tested on linux mint)
- [ ] Publish to NPM
