'use strict';

const should = require('should');
const { copy, paste } = require('../index.js');

const ASCII_CHARACTERS = '123456789abcdefghijklmnopqrstuvwxyz+-=&_[]<^=>=/{:})-{(`)}';
const CP437_CHARACTERS = 'ÉæÆôöòûùÿÖÜ¢£¥₧ƒ';
const UNICODE_CHARACTERS = 'ĀāĂăĄąĆćĈĉĊċČčĎ ፰፱፲፳፴፵፶፷፸፹፺፻፼';
const PLUS_OR_MINUS_CHARACTER = '±';

const testCopyThenPaste = async (content) => {
  const results = {
    copied: '',
    pasted: ''
  };

  try {
    results.copied = await copy(content);
  } catch (error) {
    return should.not.exist(error, `Copy ended in error.\n${error.stack}`);
  }

  results.copied.should.equal(content, `Expected ${content} to be copied but got ${results.copied}`);

  try {
    results.pasted = paste();
  } catch (error) {
    return should.not.exist(error, `Paste ended in error.\n${error.stack}`);
  }

  results.pasted.should.equal(content, `Expected ${content} to be pasted but got ${results.pasted}`);
  return true;
};

describe('copy and paste async', () => {
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
});
