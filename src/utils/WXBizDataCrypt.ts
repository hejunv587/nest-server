import * as crypto from 'crypto';

interface DecodedData {
  watermark: {
    appid: string;
  };
  // 其他属性根据实际数据结构添加
}

export class WXBizDataCrypt {
  private appId: string;
  private sessionKey: string;

  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData(encryptedData: string, iv: string): any {
    // base64 decode
    const sessionKey = Buffer.from(this.sessionKey, 'base64');
    const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');

    try {
      // 解密
      const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        sessionKey,
        ivBuffer,
      );
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      let decoded = decipher.update(
        encryptedDataBuffer,
        undefined as any,
        'utf8',
      ); // 更新这行

      decoded += decipher.final('utf8');

      const decodedjson: DecodedData = JSON.parse(decoded);

      if (decodedjson.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer');
      }

      return decoded;
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
  }
}
