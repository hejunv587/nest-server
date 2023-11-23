import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';

@Entity()
export class Document {
  @PrimaryColumn()
  id: string;

  @Column()
  filename: string;

  @Column()
  filePath: string;

  @Column({ nullable: true })
  ownerid?: string; //所有人

  @Column({ nullable: true })
  lastmodifybyid?: string; //最后修改人

  @Column({ type: 'datetime', nullable: true })
  createtime?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastmodifytime?: Date;

  @Column({ nullable: true })
  is_deleted?: boolean;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 's01'; // 表编号
    // this.id = this.customIdGeneratorService.generateCustomID(tableCode);
    this.id = generateCustomID(tableCode);
  }
}
