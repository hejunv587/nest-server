import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WxSigninDTO {
  @ApiProperty({ description: '微信解密'})
  readonly iv?: string;

  @ApiProperty({ description: '微信加密数据'})
  readonly encryptedData?: string;

  @ApiProperty({ description: 'wxlogin返回的code.用于获取openid和session_key'})
  @IsNotEmpty({ message: 'code不能为空' })
  readonly code: string;
}