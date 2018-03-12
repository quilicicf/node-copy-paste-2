// const fs = require('fs');
// const path = require('path');
const should = require('should');
const { inspect } = require('util');

// const encodings = require('../lib/encodings');
const { copy, paste } = require('../index');
const { UNICODE_CHARACTERS } = require('./test-data');
const Readable = require('stream').Readable;

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
    results.pasted = await paste({});
  } catch (error) {
    return should.not.exist(error, `Paste ended in error.\n${error.stack}`);
  }

  should.equal(results.pasted, output, `Expected ${output} to be pasted but got ${results.pasted}`);
  return true;
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
    const input = new Readable();
    const copyPromise = copy({ input });

    input.push(UNICODE_CHARACTERS);
    input.push(null);

    await copyPromise;
    const pasted = await paste({});

    should.equal(pasted, UNICODE_CHARACTERS, `Expected ${UNICODE_CHARACTERS} to be pasted but got ${pasted}`);
  });

  // TODO: fix stream with encoding conversion
  // it('should work correctly with streams and encoding conversion', async () => {
  //   const utf16File = path.resolve(__dirname, 'utf16le.unicode.txt');
  //   const input = fs.createReadStream(utf16File, { encoding: encodings.UTF16_LE });
  //   await copy({ input, inputEncoding: encodings.UTF16_LE });
  //   const pasted = await paste({});
  //
  //   should.equal(pasted, UNICODE_CHARACTERS, `Expected ${UNICODE_CHARACTERS} to be pasted but got ${pasted}`);
  // });
});
