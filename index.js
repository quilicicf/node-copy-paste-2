const { exec, spawn } = require('child_process');
const { inspect } = require('util');
const { convert } = require('encoding');
const { encodeStream, decodeStream } = require('iconv-lite');

const encodings = require('./lib/encodings');

const darwin = require('./platform/darwin');
const win32 = require('./platform/win32');
const linux = require('./platform/linux');

const platforms = {
  darwin,
  win32,
  linux,
  freebsd: linux,
  openbsd: linux
};

const getPlatform = () => {
  const platform = platforms[ process.platform ];
  if (!platform) {
    throw Error("Unknown platform: '" + process.platform + "'. Please send this error to quilicicf@gmail.com.");
  }

  return platform;
};

const platform = getPlatform();

const toBuffer = (input, inputEncoding) => {
  if (typeof input === 'string') {
    return convert(input, platform.encoding, inputEncoding);
  }

  if (Buffer.isBuffer(input)) {
    return convert(input, platform.encoding, inputEncoding);
  }

  const resultString = inspect(input, { depth: null });
  return convert(resultString, platform.encoding, inputEncoding);
};

const copy = async ({ input, inputEncoding = encodings.UTF_8 }) => {
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
        if (stderrData.length === 0) { return; }
        reject(new Error(convert(stderrData, encodings.UTF_8, platform.encoding)));
      });

    if (input.pipe) {
      input
        .pipe(decodeStream(inputEncoding))
        .pipe(encodeStream(platform.encoding))
        .pipe(child.stdin);
    } else {
      const convertedInputBuffer = toBuffer(input, inputEncoding);
      child.stdin.end(convertedInputBuffer);
    }
  });
};

const paste = async () => {
  return new Promise((resolve, reject) => {
    exec(platform.paste.command, { encoding: platform.encoding }, (error, stdout) => {
      if (error) { return reject(error); }
      return resolve(stdout.toString());
    });
  });
};

module.exports = { encodings, copy, paste };
