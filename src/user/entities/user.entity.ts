import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string; //姓名

  @Unique(['email']) // Ensure email is unique
  @Column()
  email: string; //邮箱

  @Unique(['mobile']) // Ensure email is unique
  @Column()
  mobile: string; //手机

  @Column()
  password: string; //密码

  @Column({ nullable: true })
  profile?: string; //简档(权限控制)

  @Column({ nullable: true })
  rzsj: Date; //入职日期

  @Column({ nullable: true })
  lzrq: Date; //离职日期

  @Column({ nullable: true })
  role: string; //角色,部门及上下级关系

  @Column({ default: true })
  isusing: boolean; //是否启用

  @Column({ nullable: true })
  gh: string; //工号

  @Column({ nullable: true })
  level: string; //职级职等

  @Column({ nullable: true })
  manager: string; //经理

  @Column({ nullable: true })
  avatar: string; //头像id

  @Column({ nullable: true })
  ownerid?: string; //所有人

  @Column({ nullable: true })
  lastmodifybyid?: string; //最后修改人

  @CreateDateColumn()
  createtime?: Date;

  @UpdateDateColumn()
  lastmodifytime?: Date;

  @Column({ nullable: true })
  is_deleted?: boolean;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = '005'; // 表编号
    // this.id = this.customIdGeneratorService.generateCustomID(tableCode);
    this.id = generateCustomID(tableCode);
  }
}
