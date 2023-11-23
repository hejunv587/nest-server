import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @IsNotEmpty({ message: '简档名称不能为空' })
  @IsString({ message: '简档名称必须为字符串' })
  @ApiProperty({ description: '简档名称', example: '管理员' })
  profile_name: string;

  @ApiProperty({
    description: '简档描述',
    example: '管理员',
    required: false,
  })
  description?: string;
}
