import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '姓名', example: '周星驰' })
  name: string; //姓名

  @ApiProperty({ description: '邮箱', example: 'hej@risingestate.com.cn' })
  email: string; //邮箱

  @ApiProperty({ description: '手机', example: '17612345678' })
  mobile: string; //手机

  @ApiProperty({ description: '密码', example: 'psw12345' })
  password: string; //密码

  @ApiProperty({
    description: '权限简档,不填时候默认游客',
    example: 'aaa20230b18103906e7BzM',
    required: true,
  })
  profile: string; //简档(权限控制)

  @ApiProperty({
    description: '入职日期',
    example: '2023-01-01',
    required: false,
  })
  rzsj: Date; //入职日期

  @ApiProperty({
    description: '离职日期',
    example: '2023-12-31',
    required: false,
  })
  lzrq: Date; //离职日期

  @ApiProperty({
    description: '角色',
    example: '湾厦经理',
    required: false,
  })
  role: string; //角色,部门及上下级关系

  @ApiProperty({ description: '是否启用,默认启用', example: '1' })
  isusing: boolean; //是否启用

  @ApiProperty({ description: '工号', example: '123', required: false })
  gh: string; //工号

  @ApiProperty({ description: '职级职等', example: '初级', required: false })
  level: string; //职级职等

  @ApiProperty({ description: '经理', example: '周星驰', required: false })
  manager: string; //经理

  @ApiProperty({ description: '头像链接', example: '/...', required: false })
  avatar: string; //头像id

  @ApiProperty({ description: '所有人', example: '/...', required: false })
  ownerid?: string; //所有人
}
