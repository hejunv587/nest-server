// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CustomIdGeneratorService {
//   generateCustomID(tableCode: string): string {
//     const now = new Date();
//     const year = now.getFullYear().toString(); // 当前年份
//     const month = now.getMonth() + 1; // 因为月份从0开始，所以需要加1
//     const day = now.getDate();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();

//     const hexTimestamp = `${this.hexValue(month)}${this.hexValue(day)}${this.hexValue(hours)}${this.hexValue(minutes)}${this.hexValue(seconds)}`;

//     const randomCode = this.generateRandomCode(6); // 6位随机字母和数字的组合

//     return `${tableCode}${year}${hexTimestamp}${randomCode}`;
//   }

//   private hexValue = (value) => {
//     const hex = value.toString(16);
//     return hex.length === 1 ? '0' + hex : hex;
//   };

//   private generateRandomCode(length: number) {
//     const characters =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let randomCode = '';

//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       randomCode += characters.charAt(randomIndex);
//     }
//     return randomCode;
//   }
// }

export const generateCustomID = (tableCode: string): string => {
  const now = new Date();
  const year = now.getFullYear().toString(); // 当前年份
  const month = now.getMonth() + 1; // 因为月份从0开始，所以需要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  // console.log('milliseconds', milliseconds);

  const hexMilliseconds =
    (milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : '') +
    milliseconds.toString(16);
  // console.log('hexMilliseconds', hexMilliseconds);

  const hexTimestamp = `${hexValue(month)}${hexValue(day)}${hexValue(
    hours,
  )}${hexValue(minutes)}${hexValue(seconds)}`;

  const randomCode = generateRandomCode(3); // 6位随机字母和数字的组合

  return `${tableCode}${year}${hexTimestamp}${hexMilliseconds}${randomCode}`;
};

const hexValue = (value) => {
  const hex = value.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

const generateRandomCode = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }
  return randomCode;
};
