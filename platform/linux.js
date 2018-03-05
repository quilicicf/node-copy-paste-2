module.exports = {
  copy: { command: 'xclip', args: [ '-selection', 'clipboard', '-loops', '1' ] },
  paste: { command: 'xclip -selection clipboard -o' },
  encode: (input) => Buffer.from(input, 'utf8'),
  decode: (input) => Buffer.concat(Array.isArray(input) ? input : [ input ]).toString('utf8')
};
