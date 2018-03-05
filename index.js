const _ = require('lodash');

const { execSync, spawn } = require('child_process');
const { inspect } = require('util');

const darwin = require('./platform/darwin');
const win32 = require('./platform/win32');
const linux = require('./platform/linux');

const configs = {
  darwin,
  win32,
  linux,
  freebsd: linux,
  openbsd: linux
};

const getConfig = () => {
  const config = configs[ process.platform ];
  if (!config) {
    throw Error("Unknown platform: '" + process.platform + "'. Please send this error to quilicicf@gmail.com.");
  }

  return config;
};

const config = getConfig();

const toString = (input) => {
  if (typeof input === 'string') {
    return input;
  }

  if (typeof input === 'object') {
    return inspect(input, { depth: null });
  }

  return input.toString();
};

const copy = async (input) => {
  const child = spawn(config.copy.command, config.copy.args);

  const stderrData = [];

  return new Promise((resolve, reject) => {
    child.stdin.on('error', reject);

    child
      .on('exit', () => resolve(input))
      .on('error', reject);

    child.stderr
      .on('data', (chunk) => stderrData.push(chunk))
      .on('end', () => {
        if (_.isEmpty(stderrData)) { return; }
        reject(new Error(config.decode(stderrData)));
      });

    if (input.pipe) {
      input.pipe(child.stdin);
    } else {
      child.stdin.end(config.encode(toString(input)));
    }
  });
};

const paste = () => config.decode(execSync(config.paste.command));

module.exports = { copy, paste };
