'use strict';

const _ = require('lodash');

const should = require('should');
const { convert } = require('encoding');
const { copy, paste } = require('../index');
const encodings = require('../lib/encodings');

const ASCII_CHARACTERS = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-=&_[]<^=>=/{:})-{(`)}';
const CP437_CHARACTERS = 'ÉæÆôöòûùÿÖÜ¢£¥₧ƒ';
const UNICODE_CHARACTERS = 'ĀāĂăĄąĆćĈĉĊċČčĎ ፰፱፲፳፴፵፶፷፸፹፺፻፼';
const PLUS_OR_MINUS_CHARACTER = '±';
const ALL_CHARACTERS = _.reduce(
  [ ASCII_CHARACTERS, UNICODE_CHARACTERS, CP437_CHARACTERS, PLUS_OR_MINUS_CHARACTER ],
  (seed, characters) => `${seed}${characters}`,
  ''
);

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

  results.copied.should.equal(content, `Expected ${content} to be copied but got ${results.copied}`);

  try {
    results.pasted = paste({});
  } catch (error) {
    return should.not.exist(error, `Paste ended in error.\n${error.stack}`);
  }

  results.pasted.should.equal(content, `Expected ${content} to be pasted but got ${results.pasted}`);
  return true;
};

const testCopyPasteWithEncoding = async (content, encoding) => {
  const inputBuffer = convert(content, encoding, encodings.UTF_8);
  await copy({ input: inputBuffer, inputEncoding: encoding });
  const pasted = paste({});
  pasted.should.equal(content, `Expected ${content} to be pasted but got ${pasted} for encoding: ${encoding}.`);
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

  it('should work correctly for UTF8', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS, encodings.UTF_8);
  });

  it('should work correctly for UTF16_WITH_BOM', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS, encodings.UTF16_WITH_BOM);
  });

  it('should work correctly for UTF16_BE', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS, encodings.UTF16_BE);
  });

  it('should work correctly for UTF16_LE', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS, encodings.UTF16_LE);
  });

  it('should work correctly for ucs2', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS, encodings.UCS2);
  });

  it('should work correctly for binary', async () => {
    await testCopyPasteWithEncoding(ASCII_CHARACTERS, encodings.BINARY);
  });

  it('should work correctly for ASCII', async () => {
    await testCopyPasteWithEncoding(ASCII_CHARACTERS, encodings.ASCII);
  });
});
