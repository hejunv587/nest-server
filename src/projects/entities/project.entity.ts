import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';
@Entity()
export class Project {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string; // id

  @Column()
  name: string; // 项目名称

  @Column({ nullable: true })
  area?: string; //区域

  @Column({ nullable: true })
  address?: string; //项目地址

  @Column({ nullable: true })
  department?: string; //所属部门,后续改为选择关联项

  @Column({ nullable: true })
  manager?: string; //项目部门,后续改为选择关联项

  @Column({ nullable: true })
  type?: string; // 租售类型,后续可以考虑改成enum类型

  @Column({ nullable: true })
  status?: string; // 状态,后续可以考虑改成enum类型

  @Column({ nullable: true })
  channelsettlementmethod?: string; //渠道结算方式,后续可以考虑改成enum类型

  @Column({ nullable: true })
  description?: string; // 内容\

  @Column({ nullable: true })
  ownerid?: string; //所有人

  @Column({ nullable: true })
  lastmodifybyid?: string; //最后修改人

  @Column({ nullable: true })
  createtime?: Date;

  @Column({ nullable: true })
  lastmodifytime?: Date;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'a05'; // 表编号
    // this.id = this.customIdGeneratorService.generateCustomID(tableCode);
    this.id = generateCustomID(tableCode);
  }
}

// export class Project {
//   id: string; // id
//   name: string; // 项目名称
//   area?: string; //区域
//   address?: string; //项目地址
//   department?: string; //所属部门,后续改为选择关联项
//   manager?: string; //项目部门,后续改为选择关联项
//   type?: string; // 租售类型,后续可以考虑改成enum类型
//   status?: string; // 状态,后续可以考虑改成enum类型
//   channelsettlementmethod?: string; //渠道结算方式,后续可以考虑改成enum类型
//   description?: string; // 内容
//   ownerid?: string; //所有人
//   lastmodifybyid?: string; //最后修改人
//   createtime?: Date;
//   lastmodifytime?: Date;
// }
