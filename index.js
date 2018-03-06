const _ = require('lodash');

const { execSync, spawn } = require('child_process');
const { inspect } = require('util');

const platform = require('./platform/platform');

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
  const child = spawn(platform.copy.command, platform.copy.args);

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
        reject(new Error(platform.decode(stderrData)));
      });

    if (input.pipe) {
      input.pipe(child.stdin);
    } else {
      child.stdin.end(platform.encode(toString(input)));
    }
  });
};

const paste = () => platform.decode(execSync(platform.paste.command));

module.exports = { copy, paste };
