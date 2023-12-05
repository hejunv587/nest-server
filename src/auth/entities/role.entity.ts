// role.entity.ts

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
} from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';

@Entity()
@Index('idx_roleId', ['roleId'], { unique: false }) // Define an index on roleId
export class Role {
  @PrimaryColumn()
  id: string;

  // @ManyToOne(() => Role, { nullable: true })
  // @JoinColumn({ name: 'parentRoleId' })
  // parentRole: Role;
  @Column()
  parentRoleId: string;

  @Column()
  roleName: string;

  @Column()
  roleId?: string;

  @Column()
  currentLevel: number;

  @Column()
  gap: number;

  @CreateDateColumn()
  createtime?: Date;

  @UpdateDateColumn()
  lastmodifytime?: Date;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'aad'; // 表编号,aad代表每一个role的唯一id
    this.id = generateCustomID(tableCode);
  }

  // @BeforeInsert()
  // generatRoleIDFunc() {
  //   const tableCode = 'aae'; // 表编号,aae代表roleid
  //   this.roleId = generateCustomID(tableCode);
  // }
}
