import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AccessDTO {
  @IsNumber()
  @ApiProperty({
    description: '访问类型,菜单或路径,0菜单,1路径',
    example: 0,
  })
  type: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '请求URL',
    example: '/prjectfile',
  })
  req_url: string;

  @ApiProperty({
    description: '请求方式',
    example: 'GET',
  })
  @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
  req_method: string;

  // @IsOptional()
  // @IsString()
  // parent: string; // Assuming the parent ID is a string, adjust as needed

  // @IsOptional()
  // children: AccessDTO[]; // Assuming children are an array of AccessDTO, adjust as needed
  
  @ApiProperty({
    description: 'meta标题',
    example: '项目档案接口'
  })
  @IsString()
  @IsNotEmpty()
  meta_title: string;

  @ApiProperty({
    description: 'meta icon地址',
    example: ''
  })
  @IsString()
  meta_icon?: string;

  @ApiProperty({ description: '路由菜单是否隐藏', example: '是 否' })
  @IsBoolean()
  hidden: boolean;

  @ApiProperty({ description: '路由跳转', example: '/' })
  @IsString()
  redirect: string;

  @ApiProperty({ description: '路由名称', example: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '路由文件路径', example: 'dashboard/index' })
  @IsString()
  component: string;

  @ApiProperty({ description: '是否为动态路由', example: '是 否' })
  @IsBoolean()
  props: boolean;

  @ApiProperty({ description: '状态', example: 1, required: false })
  @IsOptional()
  @IsEnum([0, 1])
  status?: number;

  @ApiProperty({ description: '顶级菜单排序', example: 1, required: false })
  @IsOptional()
  @IsInt()
  order?: number;
}
