const path = require('path');

const vbsPath = path.join(__dirname, 'fallbacks', 'paste.vbs');

module.exports = {
  copy: { command: 'clip', args: [] },
  paste: { command: `cscript /Nologo "${vbsPath}"` },
  encoding: 'utf16le'
};
