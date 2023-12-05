import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @IsString({ message: '角色id必须为字符串' })
  @ApiProperty({
    description: '角色id,为空的时候就由系统自动生成',
    example: 'aae-xxxxxxxx',
  })
  roleId?: string;

  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString({ message: '角色名称必须为字符串' })
  @ApiProperty({ description: '角色名称', example: '董事长' })
  roleName: string;

  //   @IsNotEmpty({ message: '父角色不能为空' })
  @IsString({ message: '父角色id必须为字符串' })
  @ApiProperty({ description: '父角色id', example: 'roleid' })
  parentRoleId?: string;

  @IsString({ message: '角色层级' })
  @ApiProperty({
    description: '角色层级,应该自动在父角色层级上+1',
    example: '0',
  })
  currentLevel: number;

  @IsString({ message: '角色层级间隔数' })
  @ApiProperty({
    description: '角色层级间隔数,应该自动关联父角色的关系,然后gap+1',
    example: '0',
  })
  gap: number;

  createtime?: Date;

  lastmodifytime?: Date;
}
