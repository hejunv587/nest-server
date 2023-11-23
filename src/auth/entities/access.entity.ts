import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { generateCustomID } from '../../utils/customId.service';

@Entity()
// @Tree('materialized-path')
export class Access {
  @PrimaryColumn()
  id: string; // id

  @ApiProperty({ description: '菜单或路径,0菜单,1路径', example: '0,1' })
  @Column()
  type: number;

  @ApiProperty({ description: '请求路径', example: '/' })
  @Column()
  req_url: string;

  @ApiProperty({ description: '请求方式', example: 'get' })
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], {
    message: '请求方式类型错误',
    context: { errorCode: 403 },
  })
  @Column()
  req_method: string;

  // @ApiProperty({ description: '上级', example: '/' })
  // @TreeParent()
  // parent: Access;

  // @ApiProperty({ description: '路由路径', example: '/' })
  // @TreeChildren()
  // children: Access[];

  @ApiProperty({ description: '菜单标题', example: '菜单标题' })
  @Column()
  meta_title: string;

  @ApiProperty({ description: '菜单图标', example: '菜单标题' })
  @Column()
  meta_icon: string;

  @ApiProperty({ description: '路由菜单是否隐藏', example: '是 否' })
  @Column({ type: 'boolean' })
  hidden: boolean;

  @ApiProperty({ description: '路由跳转', example: '/' })
  @Column()
  redirect: string;

  @ApiProperty({ description: '路由名称', example: 'name' })
  @Column()
  name: string;

  @ApiProperty({ description: '路由文件路径', example: 'dashboard/index' })
  @Column()
  component: string;

  @ApiProperty({ description: '是否为动态路由', example: '是 否' })
  @Column({ type: 'boolean' })
  props: boolean;

  @ApiProperty({ description: '状态', example: 1, required: false })
  @Column({ default: 1 })
  status: number;

  @ApiProperty({ description: '顶级菜单排序', example: 1, required: false })
  @Column({ type: 'int' })
  order: number;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'aab'; // 表编号
    this.id = generateCustomID(tableCode);
  }
}
