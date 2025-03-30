// noinspection NonAsciiCharacters
const surnamePronunciationRecord = {
  单: "善",
  曾: "增",
  陈曲: "陈屈",
};
/**
 * 修复常见的人名读音错误
 * @param name
 */
export const namePronunciationFix = (name: string) => {
  let newName = name;
  // @ts-expect-error TS2322
  const sortedSurnameRecordKeys: (keyof typeof surnamePronunciationRecord)[] = Object.keys(
    surnamePronunciationRecord,
  ).sort((a, b) => b.length - a.length);
  for (const surname of sortedSurnameRecordKeys) {
    if (name.startsWith(surname)) {
      newName = surnamePronunciationRecord[surname] + name.slice(surname.length);
      break;
    }
  }
  newName = newName.replace("一", "壹");
  return newName;
};


// noinspection NonAsciiCharacters
const versePronunciationRecord = {
  天姥连天向天横: "天母连天向天横",
  熊咆龙吟殷岩泉: "熊咆龙吟隐岩泉",
  问渠那得清如许: "问渠哪得清如许",
  笑谈渴饮匈奴血: "笑谈渴饮匈奴谑",
  斗酒十千恣欢谑: "抖酒十千恣欢谑",
}
export const versePronunciationFix = (verse: string) => {
  // @ts-expect-error TS7053
  return versePronunciationRecord[verse] || verse;
}


const chineseDigits = "零一二三四五六七八九十";
/**
 * 将数字转化为中文字符
 * @param num 要转化的数字。0 ~ 49
 * @param charCount 转化后的字符个数。3 或 4
 */
export const numberToChineseChars = (num: number, charCount: number) => {
  if (num < 0 || num > 49) throw new Error("只支持转化 0 ~ 49 的整数");
  if (charCount === 4) {
    if (num <= 10) return chineseDigits[num] + "号同学";
    if (num === 20) return "四五二十";
    if (num === 30) return "经典三十";
    if (num === 40) return "五八四十";
    return `${chineseDigits[Math.floor(num / 10)]}十${chineseDigits[num % 10]}号`;
  } else if (charCount === 3) {
    if (num <= 10) return `第${chineseDigits[num]}号`;
    if (num % 10 === 0) return `${chineseDigits[num / 10]}十号`;
    return `${chineseDigits[Math.floor(num / 10)]}十${chineseDigits[num % 10]}`;
  } else {
    throw new Error("只支持 3 或 4 个字符");
  }
};
