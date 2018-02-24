exports.copy = { command: "xclip", args: [ "-selection", "clipboard" ] };
exports.paste = { command: "xclip", args: [ "-selection", "clipboard", "-o" ] };
exports.paste.full_command = [ exports.paste.command ].concat(exports.paste.args).join(" ");
exports.encode = (str) => { return new Buffer(str, "utf8"); };
exports.decode = (chunks) => {
  if (!Array.isArray(chunks)) { chunks = [ chunks ]; }

  return Buffer.concat(chunks).toString("utf8");
};
