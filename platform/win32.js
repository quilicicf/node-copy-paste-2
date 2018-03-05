const _ = require('lodash');
const iconv = require('iconv-lite');
const path = require('path');

const vbsPath = path.join(__dirname, 'fallbacks', 'paste.vbs');

module.exports = {
  copy: { command: 'clip', args: [] },
  paste: { command: `cscript /Nologo "${vbsPath}"` },
  encode: (input) => iconv.encode(input, 'utf16le'),
  decode: (chunks) => {
    const input = Array.isArray(chunks) ? chunks : [ chunks ];
    const cp437 = iconv.decode(Buffer.concat(input), 'cp437');
    const b64 = _.replace(cp437, /\r\n$/, '');
    const noBom = Buffer.from(b64, 'base64').slice(3);
    return noBom.toString('utf-8');
  }
};
