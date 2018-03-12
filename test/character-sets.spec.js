const should = require('should');
const { copy, paste } = require('../index');

const {
  ASCII_CHARACTERS,
  CP437_CHARACTERS,
  UNICODE_CHARACTERS,
  PLUS_OR_MINUS_CHARACTER,
  JAPANESE_CHARACTERS,
  CHINESE_CHARACTERS,
  KOREAN_CHARACTERS,
  TAIWAN_CHARACTERS
} = require('./test-data');

const testCopyThenPaste = async (content) => {
  const results = {
    copied: '',
    pasted: ''
  };

  try {
    results.copied = await copy({ input: content });
  } catch (error) {
    return should.not.exist(error, `Copy ended in error.\n${error.stack}`);
  }

  should.equal(results.copied, content, `Expected ${content} to be copied but got ${results.copied}`);

  try {
    results.pasted = await paste();
  } catch (error) {
    return should.not.exist(error, `Paste ended in error.\n${error.stack}`);
  }

  should.equal(results.pasted, content, `Expected ${content} to be pasted but got ${results.pasted}`);
  return true;
};

describe('Copy and paste with different character sets', () => {
  it('should work correctly with ascii chars (<128)', async () => {
    await testCopyThenPaste(ASCII_CHARACTERS);
  });

  it('should work correctly with cp437 chars (<256)', async () => {
    await testCopyThenPaste(CP437_CHARACTERS);
  });

  it('should work correctly with unicode chars (<2^16)', async () => {
    await testCopyThenPaste(UNICODE_CHARACTERS);
  });

  it('should work correctly for "±"', async () => {
    await testCopyThenPaste(PLUS_OR_MINUS_CHARACTER);
  });

  it('should work correctly for japanese characters', async () => {
    await testCopyThenPaste(JAPANESE_CHARACTERS);
  });

  it('should work correctly for chinese characters', async () => {
    await testCopyThenPaste(CHINESE_CHARACTERS);
  });

  it('should work correctly for korean characters', async () => {
    await testCopyThenPaste(KOREAN_CHARACTERS);
  });

  it('should work correctly for taiwanese characters', async () => {
    await testCopyThenPaste(TAIWAN_CHARACTERS);
  });
});
