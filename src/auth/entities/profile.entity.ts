import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';

@Entity()
export class Profile {
  @PrimaryColumn()
  id: string; // id

  @Column()
  profile_name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createtime?: Date;

  @UpdateDateColumn()
  lastmodifytime?: Date;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'aaa'; // 表编号
    this.id = generateCustomID(tableCode);
  }
}
