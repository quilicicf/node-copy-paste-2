const iconv = require("iconv-lite");
const path = require("path");

const vbsPath = path.join(__dirname, ".\\fallbacks\\paste.vbs");

const paste = { command: "cscript", args: [ "/Nologo", vbsPath ] };
paste.full_command = [ paste.command, paste.args[ 0 ], '"' + vbsPath + '"' ].join(" ");

exports.copy = { command: "clip", args: [] };
exports.paste = paste;

exports.encode = (str) => { return iconv.encode(str, "utf16le"); };
exports.decode = (chunks) => {
  if (!Array.isArray(chunks)) { chunks = [ chunks ]; }

  const b64 = iconv
    .decode(Buffer.concat(chunks), "cp437")
    .substr(0, b64.length - 2); // Chops off extra "\r\n"

  // remove bom and decode
  return new Buffer(b64, "base64").slice(3).toString("utf-8");
};
