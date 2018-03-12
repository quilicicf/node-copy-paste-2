const _ = require('lodash');

module.exports = {
  ASCII_CHARACTERS: '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-=&_[]<^=>=/{:})-{(`)}',
  CP437_CHARACTERS: 'ÉæÆôöòûùÿÖÜ¢£¥₧ƒ',
  UNICODE_CHARACTERS: 'ĀāĂăĄąĆćĈĉĊċČčĎ ፰፱፲፳፴፵፶፷፸፹፺፻፼',
  PLUS_OR_MINUS_CHARACTER: '±',
  JAPANESE_CHARACTERS: 'こんにちは、ほげ☆ぴよ',
  CHINESE_CHARACTERS: '搜索设置加入百度推广搜索风云榜关于百度',
  KOREAN_CHARACTERS: '디자인을함에있어시각적연출이필요한빈공간',
  TAIWAN_CHARACTERS: '中文測試十',
  ALL_CHARACTERS () {
    return _.reduce(this, (seed, characters) => `${seed}${characters}`, '');
  }
};
