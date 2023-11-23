import { generateCustomID } from 'src/utils/customId.service';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { Access } from './access.entity';
import { Profile } from './profile.entity';

@Entity()
export class ProfileAccess {
  @PrimaryColumn()
  id: string; // id

  @Column()
  accessId: string;

  @Column()
  profileId: string;

  @ManyToOne(() => Access, { eager: true })
  @JoinColumn({ name: 'accessId' })
  access: Access;

  @ManyToOne(() => Profile, { eager: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'aac'; // 表编号
    this.id = generateCustomID(tableCode);
  }
}
