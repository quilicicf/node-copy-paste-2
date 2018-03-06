#!/usr/bin/env node

const { exec } = require('child_process');

const darwin = require('./darwin');
const win32 = require('./win32');
const linux = require('./linux');

const platforms = {
  darwin,
  win32,
  linux,
  freebsd: linux,
  openbsd: linux
};

const checkInstall = (platform) => {
  const command = platform.copy.command;
  exec(`${command} --version`, { stdio: [ 'pipe', 'ignore', 'ignore' ] }, (error) => {
    if (!error || error.code !== 127) {
      process.stdout.write(`✔ ${command} seems to be installed.\n`);
    } else {
      process.stderr.write(`❌ ${command} is not installed. Node-copy-paste won't work until you install it.\n`);
    }
  });
};

const getPlatform = () => {
  const platform = platforms[ process.platform ];
  if (!platform) {
    throw Error("Unknown platform: '" + process.platform + "'. Please send this error to quilicicf@gmail.com.");
  }

  return {
    ...platform,
    checkInstall: () => checkInstall(platform)
  };
};

module.exports = getPlatform();
