const should = require('should');
const { convert } = require('encoding');
const { copy, paste } = require('../index');
const encodings = require('../lib/encodings');

const {
  ASCII_CHARACTERS,
  CHINESE_CHARACTERS,
  KOREAN_CHARACTERS,
  TAIWAN_CHARACTERS,
  JAPANESE_CHARACTERS,
  ALL_CHARACTERS
} = require('./test-data');

const testCopyPasteWithEncoding = async (content, encoding) => {
  const inputBuffer = convert(content, encoding, encodings.UTF_8);
  await copy({ input: inputBuffer, inputEncoding: encoding });
  const pasted = await paste();
  should.equal(pasted, content, `Expected ${content} to be pasted but got ${pasted} for encoding: ${encoding}.`);
};


describe('Copy and paste with different encodings', () => {
  it('should work correctly for UTF8', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS(), encodings.UTF_8);
  });

  it('should work correctly for UTF16_WITH_BOM', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS(), encodings.UTF16_WITH_BOM);
  });

  it('should work correctly for UTF16_BE', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS(), encodings.UTF16_BE);
  });

  it('should work correctly for UTF16_LE', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS(), encodings.UTF16_LE);
  });

  it('should work correctly for UCS2', async () => {
    await testCopyPasteWithEncoding(ALL_CHARACTERS(), encodings.UCS2);
  });

  it('should work correctly for BINARY', async () => {
    await testCopyPasteWithEncoding(ASCII_CHARACTERS, encodings.BINARY);
  });

  it('should work correctly for ASCII', async () => {
    await testCopyPasteWithEncoding(ASCII_CHARACTERS, encodings.ASCII);
  });

  // Japanese
  it('should work correctly for SHIFT_JIS', async () => {
    await testCopyPasteWithEncoding(JAPANESE_CHARACTERS, encodings.SHIFT_JIS);
  });

  it('should work correctly for WINDOWS_31J', async () => {
    await testCopyPasteWithEncoding(JAPANESE_CHARACTERS, encodings.WINDOWS_31J);
  });

  it('should work correctly for WINDOWS_932', async () => {
    await testCopyPasteWithEncoding(JAPANESE_CHARACTERS, encodings.WINDOWS_932);
  });

  // Chinese
  it('should work correctly for GB2312', async () => {
    await testCopyPasteWithEncoding(CHINESE_CHARACTERS, encodings.GB2312);
  });

  it('should work correctly for GBK', async () => {
    await testCopyPasteWithEncoding(CHINESE_CHARACTERS, encodings.GBK);
  });

  it('should work correctly for GB18030', async () => {
    await testCopyPasteWithEncoding(CHINESE_CHARACTERS, encodings.GB18030);
  });

  it('should work correctly for WINDOWS_936', async () => {
    await testCopyPasteWithEncoding(CHINESE_CHARACTERS, encodings.WINDOWS_936);
  });

  it('should work correctly for EUC_CN', async () => {
    await testCopyPasteWithEncoding(CHINESE_CHARACTERS, encodings.EUC_CN);
  });

  // Korean
  it('should work correctly for KS_C_5601', async () => {
    await testCopyPasteWithEncoding(KOREAN_CHARACTERS, encodings.KS_C_5601);
  });

  it('should work correctly for WINDOWS_949', async () => {
    await testCopyPasteWithEncoding(KOREAN_CHARACTERS, encodings.WINDOWS_949);
  });

  it('should work correctly for EUC_KR', async () => {
    await testCopyPasteWithEncoding(KOREAN_CHARACTERS, encodings.EUC_KR);
  });

  // Taiwan/Hong-kong
  it('should work correctly for BIG_5', async () => {
    await testCopyPasteWithEncoding(TAIWAN_CHARACTERS, encodings.BIG_5);
  });

  it('should work correctly for BIG_5_HKSCS', async () => {
    await testCopyPasteWithEncoding(TAIWAN_CHARACTERS, encodings.BIG_5_HKSCS);
  });

  it('should work correctly for WINDOWS_950', async () => {
    await testCopyPasteWithEncoding(TAIWAN_CHARACTERS, encodings.WINDOWS_950);
  });
});
