const { execSync, spawn } = require('child_process');
const util = require('util');

const darwin = require('./platform/darwin');
const win32 = require('./platform/win32');
const linux = require('./platform/linux');
const openbsd = require('./platform/openbsd');

const configs = {
  darwin,
  win32,
  linux,
  freebsd: linux,
  openbsd
};

const getConfig = () => {
  const config = configs[ process.platform ];
  if (!config) {
    throw Error("Unknown platform: '" + process.platform + "'.  Send this error to xavi.rmz@gmail.com.");
  }

  return config;
};

const config = getConfig();

const getOutput = (text) => {
  const type = Object.prototype.toString.call(text);

  if (type === '[object String]') {
    return text;
  }

  if (type === '[object Object]') {
    return util.inspect(text, { depth: null });
  }

  if (type === '[object Array]') {
    return util.inspect(text, { depth: null });
  }

  return text.toString();
};

const copy = (text, callback) => {
  const child = spawn(config.copy.command, config.copy.args);

  const done = callback ? callback : () => {};

  const stderrData = [];

  child.stdin.on('error', done);

  child
    .on('exit', () => done(null, text))
    .on('error', done);

  child.stderr
    .on('data', (chunk) => stderrData.push(chunk))
    .on('end', () => {
      if (stderrData.length === 0) { return; }
      done(new Error(config.decode(stderrData)));
    });

  if (text.pipe) {
    text.pipe(child.stdin);
  } else {
    child.stdin.end(config.encode(getOutput(text)));
  }

  return text;
};

const pasteCommand = [ config.paste.command ].concat(config.paste.args).join(' ');

const paste = (callback) => {
  if (execSync && !callback) {
    return config.decode(execSync(pasteCommand));
  }

  if (callback) {
    const child = spawn(config.paste.command, config.paste.args);

    const done = callback ? callback : () => {};

    const data = [];
    const stderrData = [];

    child.on('error', done);

    child.stdout
      .on('data', (chunk) => data.push(chunk))
      .on('end', () => done(null, config.decode(data)));

    child.stderr
      .on('data', (chunk) => stderrData.push(chunk))
      .on('end', () => {
        if (stderrData.length === 0) { return; }

        done(new Error(config.decode(stderrData)));
      });

  } else {
    throw new Error('No synchronous version of paste is supported on this platform.');
  }
};

const copyAsync = async (content) => {
  return new Promise((resolve, reject) => {
    copy(content, (error, content) => {
      if (error) {
        return reject(error);
      }

      return resolve(content);
    });
  });
};

const pasteAsync = async () => {
  return new Promise((resolve, reject) => {
    paste((error, content) => {
      if (error) {
        return reject(error);
      }

      return resolve(content);
    });
  });
};

module.exports = { copy, paste, copyAsync, pasteAsync };
