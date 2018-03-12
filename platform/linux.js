module.exports = {
  copy: { command: 'xclip', args: [ '-selection', 'clipboard', '-loops', '1' ] },
  paste: { command: 'xclip -selection clipboard -o' },
  encoding: 'utf8'
};
