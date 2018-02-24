'use strict';

const winr = require('why-is-node-running');
const should = require('should');
const { copy, copyAsync, paste, pasteAsync } = require('../index.js');

const ASCII_CHARACTERS = '123456789abcdefghijklmnopqrstuvwxyz+-=&_[]<^=>=/{:})-{(`)}';
const CP437_CHARACTERS = 'ÉæÆôöòûùÿÖÜ¢£¥₧ƒ';
const UNICODE_CHARACTERS = 'ĀāĂăĄąĆćĈĉĊċČčĎ ፰፱፲፳፴፵፶፷፸፹፺፻፼';
const PLUS_OR_MINUS_CHARACTER = '±';

const testCopyAndPaste = (content, done) => {
  copy(content, (copyError, copyValue) => {
    should.not.exist(copyError);
    should.exist(copyValue);
    copyValue.should.equal(content);

    paste((pasteError, pasteValue) => {
      should.not.exist(pasteError);
      should.exist(pasteValue);
      pasteValue.should.equal(content);
      done();
    });
  });
};

const testAsyncMethod = async (content, methodAsync, methodName) => {
  try {
    const result = await methodAsync(content);
    result.should.equal(content, `Result of ${methodName} differs from input`);
    return result;

  } catch (error) {
    return should.not.exist(error, `${methodName} ended in error.\n${error.stack}`);
  }
};

const testAsyncMethods = async (content) => {
  const copied = await testAsyncMethod(content, copyAsync, 'copyAsync');
  await testAsyncMethod(copied, pasteAsync, 'pasteAsync');
};

describe('copy and paste', () => {
  it('should work correctly with ascii chars (<128)', (done) => {
    testCopyAndPaste(ASCII_CHARACTERS, done);
  });

  // it('should work correctly with cp437 chars (<256)', (done) => {
  //   testCopyAndPaste(CP437_CHARACTERS, done);
  // });
  //
  // it('should work correctly with unicode chars (<2^16)', (done) => {
  //   testCopyAndPaste(UNICODE_CHARACTERS, done);
  // });
  //
  // it('should work correctly for "±"', (done) => {
  //   testCopyAndPaste(PLUS_OR_MINUS_CHARACTER, done);
  // });
});

// describe('copy and paste async', async () => {
//   it('should work correctly with ascii chars (<128)', async () => {
//     await testAsyncMethods(ASCII_CHARACTERS);
//   });
//
//   it('should work correctly with cp437 chars (<256)', async () => {
//     await testAsyncMethods(CP437_CHARACTERS);
//   });
//
//   it('should work correctly with unicode chars (<2^16)', async () => {
//     await testAsyncMethods(UNICODE_CHARACTERS);
//   });
//
//   it('should work correctly for "±"', async () => {
//     await testAsyncMethods(PLUS_OR_MINUS_CHARACTER);
//   });
// });

setTimeout(() => {
  winr();
}, 1000);

