THIS REPOSITORY IS A COPY
=========================


It was copied from [node-copy-paste](https://github.com/xavi-/node-copy-paste) because [this security-related PR](https://github.com/xavi-/node-copy-paste/pull/64) was never merged.

I took the liberty to do the following:
- upgrade the code to newer JS syntax => now runs on NodeJS 7+
- remove deprecated methods (silent, noConflict)
- add async methods
- upgrade all dependencies to their latest versions
- remove the method `global` as globals are evil
- the core of the code has not changed and all credits should go to @xavi-

# node-copy-paste

A command line utility that allows read/write (i.e copy/paste) access to the system clipboard.  It does this by wrapping [`pbcopy/pbpaste`](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/pbcopy.1.html) (for OSX), [`xclip`](http://www.cyberciti.biz/faq/xclip-linux-insert-files-command-output-intoclipboard/) (for Linux, FreeBSD, and OpenBSD), and [`clip`](http://www.labnol.org/software/tutorials/copy-dos-command-line-output-clipboard-clip-exe/2506/) (for Windows). Currently works with node.js v7+.

## The API

When `require("copy-paste")` is executed, an object with the following properties is returned:

- `copy(text[, callback])`: DEPRECATED, use `copyAsync`. Asynchronously replaces the current content of the clipboard with `text`.  Takes either a string, array, object, or readable stream. Returns the input value. Optional callback will fire when the copy operation is complete.
- `copyAsync(text)`: a version of `copy` that returns a promise with the copied text
- `paste([callback])`: DEPRECATED, use `pasteAsync`. If no callback is provided, `paste` synchronously returns the current contents of the system clip board. Otherwise, the contents of the system clip board are passed to the callback as the second parameter.
- `pasteAsync(text)`: a version of `paste` that returns a promise with the copied text

## Example

```js
var ncp = require("copy-paste");

ncp.copy('some text', function () {
  // complete...
})
```

## Getting node-copy-paste

The easiest way to get node-copy-paste is with [npm](http://npmjs.org/):

	npm install -g copy-paste

Alternatively you can clone this git repository:

	git clone git://github.com/xavi-/node-copy-paste.git

## Future plans

I'm hoping to add various fallbacks for instances when `xclip` or `clip` is not avaiable (see [experimental-fallbacks](https://github.com/xavi-/node-copy-paste/tree/experimental-fallbacks/platform) branch).  Also this library needs to be more thoroughly tested on windows.

## Developed by
* Xavi Ramirez

## License
This project is released under [The MIT License](http://www.opensource.org/licenses/mit-license.php).
