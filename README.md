THIS REPOSITORY IS A COPY
=========================


It was copied from [node-copy-paste](https://github.com/xavi-/node-copy-paste) because [this security-related PR](https://github.com/xavi-/node-copy-paste/pull/64) was never merged.

I took the liberty to do the following:
- upgrade the code to newer JS syntax => now runs on NodeJS 7+
- remove deprecated methods (silent, noConflict)
- switch from callbacks to async/await
- upgrade all dependencies to their latest versions
- remove the method `global` as globals are evil
- the core of the code has not changed and all credits should go to @xavi-

# node-copy-paste-2

A command line utility that allows read/write (i.e copy/paste) access to the system clipboard.  It does this by wrapping [pbcopy/pbpaste](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/pbcopy.1.htmlhttps://coderwall.com/p/osbzzq/copy-files-to-clipboard-using-command-line-on-osx) (for OSX), [xclip](https://github.com/astrand/xclip) (for Linux, FreeBSD, and OpenBSD), and [clip](https://www.labnol.org/software/copy-command-output-to-clipboard/2506/) (for Windows). Currently works with node.js v7+.

## The API

When `require("copy-paste-2")` is executed, an object with the following properties is returned:

- `copy(stream|string|array|object)`: Asynchronously replaces the current content of the clipboard with the input. Takes either a string, array, object, or readable stream. Returns the input value.
- `paste()`: Synchronously returns the current contents of the system clip board.

## Example

```js
const ncp = require("copy-paste");

ncp.copy('some text')
  .then((copiedText) => {
    // ...
  });
```

## Install

```
npm install copy-paste
```

## TODO list

- [ ] Install code quality/security tools
- [ ] Test more thoroughly, currently only text copies are tested. Not objects, arrays, streams...
- [ ] Properly test on all platforms (currently only tested on linux mint)
