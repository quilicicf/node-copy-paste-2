const fs = require('fs');
const path = require('path');
const should = require('should');
const { inspect } = require('util');

const encodings = require('../lib/encodings');
const { copy, paste } = require('../index');
const { UNICODE_CHARACTERS, JAPANESE_CHARACTERS } = require('./test-data');

const testCopyThenPaste = async (input, output) => {
  const results = {
    copied: '',
    pasted: ''
  };

  try {
    results.copied = await copy({ input });
  } catch (error) {
    return should.not.exist(error, `Copy ended in error.\n${error.stack}`);
  }

  should.equal(results.copied, input, `Expected ${input} to be copied but got ${results.copied}`);

  try {
    results.pasted = await paste();
  } catch (error) {
    return should.not.exist(error, `Paste ended in error.\n${error.stack}`);
  }

  should.equal(results.pasted, output, `Expected ${output} to be pasted but got ${results.pasted}`);
  return true;
};

const testStream = async (fileName, inputEncoding, characters) => {
  const input = fs.createReadStream(path.resolve(__dirname, fileName));
  await copy({ input, inputEncoding });
  const pasted = await paste();

  should.equal(pasted, `${characters}\n`, `Expected ${characters} to be pasted but got ${pasted}`);
};

describe('Copy and paste different types of input', () => {
  it('should work correctly with JS object', async () => {
    const input = {
      characters: UNICODE_CHARACTERS,
      'dotted.id': 'whatever'
    };
    const output = inspect(input, { depth: null });
    await testCopyThenPaste(input, output);
  });

  it('should work correctly with JS array', async () => {
    const input = [ UNICODE_CHARACTERS, 'whatever', { titi: 'toto' } ];
    const output = inspect(input, { depth: null });
    await testCopyThenPaste(input, output);
  });

  it('should work correctly with streams', async () => {
    await testStream('utf8.unicode.txt', encodings.UTF_8, UNICODE_CHARACTERS);
  });

  it('should work correctly with stream in UTF16_LE encoding', async () => {
    await testStream('utf16le.unicode.txt', encodings.UTF16_LE, UNICODE_CHARACTERS);
  });

  it('should work correctly with stream in EUC_JP encoding', async () => {
    await testStream('euc-jp.japanese.txt', encodings.EUC_JP, JAPANESE_CHARACTERS);
  });
});
