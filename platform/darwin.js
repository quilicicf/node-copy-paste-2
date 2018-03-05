module.exports = {
  copy: { command: 'pbcopy' },
  paste: { command: 'pbpaste' },
  encode: (input) => Buffer.from(input, 'utf8'),
  decode: (input) => Buffer.concat(Array.isArray(input) ? input : [ input ]).toString('utf8')
};
