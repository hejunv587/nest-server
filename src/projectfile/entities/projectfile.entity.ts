export class Projectfile {}

import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { generateCustomID } from '../../utils/customId.service';
@Entity()
export class ProjectFile {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string; // id

  @Column()
  name: string; // 项目名称

  @Column({ nullable: true })
  district?: string; //区域

  @Column({ nullable: true })
  sub_district?: string; //细分区域

  @Column({ nullable: true })
  address?: string; //项目地址

  @Column({ nullable: true })
  project_type?: string; //项目类型,代理项目,一般代理项目,市场项目?

  @Column({ type: 'date', nullable: true })
  completion_date?: Date; //竣工时间

  @Column({ nullable: true })
  area_range?: string; //面积区间,"200-2126㎡"

  @Column({ nullable: true })
  reference_price?: number; //参考价

  @Column({ nullable: true })
  lease_sale_type?: string; // 租售类型,后续可以考虑改成enum类型

  @Column({ nullable: true })
  building_footprint?: number; // 项目占地面积

  @Column({ nullable: true })
  total_building_area?: number; // 项目总建筑面积

  @Column({ nullable: true })
  building_height?: number; // 建筑高度

  @Column({ nullable: true })
  aboveground_floors: number; // 地上层数

  @Column({ nullable: true })
  underground_floors: number; // 地下层数

  @Column({ nullable: true })
  calculated_building_area: number; // 计容建筑面积

  @Column({ nullable: true })
  apartment_area?: number; // 计容公寓面积

  @Column({ nullable: true })
  commercial_area?: number; //计容商业面积

  @Column({ nullable: true })
  office_area?: number; //计容办公面积

  @Column({ nullable: true })
  hotel_area?: number; //计容酒店面积

  @Column({ nullable: true })
  ground_parking?: number; // 地面停车位数量

  @Column({ nullable: true })
  underground_parking?: number; //地下停车位数量

  @Column({ nullable: true })
  parking_charges?: string; //停车收费标准

  @Column({ nullable: true })
  property_company?: string; //物业公司

  @Column({ nullable: true })
  management_fees?: string; //物业费

  @Column({ nullable: true })
  charging_piles?: string; //充电桩

  @Column({ nullable: true })
  elevator_brand?: string; //电梯品牌

  @Column({ nullable: true })
  elevator_number?: string; //电梯数量

  @Column({ nullable: true })
  floor_height?: number; //标准层净高

  @Column({ nullable: true })
  utility_rate?: string; //实用率

  @Column({ nullable: true })
  exterior_facade1: string; //外立面1

  @Column({ nullable: true })
  exterior_facade2: string; //外立面2

  @Column({ nullable: true })
  exterior_facade3: string; //外立面3

  @Column({ nullable: true })
  exterior_facade4: string; //外立面4

  @Column({ nullable: true })
  exterior_facade5: string; //外立面5

  @Column({ nullable: true })
  exterior_facade6: string; //外立面6

  @Column({ nullable: true })
  renderings1: string; //效果图1

  @Column({ nullable: true })
  renderings2: string; //效果图2

  @Column({ nullable: true })
  renderings3: string; //效果图3

  @Column({ nullable: true })
  floor_plan1: string; //户型图1

  @Column({ nullable: true })
  floor_plan2: string; //户型图2

  @Column({ nullable: true })
  floor_plan3: string; //户型图3

  @Column({ nullable: true })
  floor_plan4: string; //户型图4

  @Column({ nullable: true })
  floor_plan5: string; //户型图5

  @Column({ nullable: true })
  floor_plan6: string; //户型图6

  @Column({ nullable: true })
  public_area1: string; //公共区1

  @Column({ nullable: true })
  public_area2: string; //公共区2

  @Column({ nullable: true })
  public_area3: string; //公共区3

  @Column({ nullable: true })
  public_area4: string; //公共区5

  @Column({ nullable: true })
  public_area5: string; //公共区5

  @Column({ nullable: true })
  public_area6: string; //公共区6

  @Column({ nullable: true })
  airconditioner_brand?: string; //空调品牌

  @Column({ nullable: true })
  airconditioner_cost?: string; //空调费用

  @Column({ nullable: true })
  settled_companies?: string; //入驻企业

  @Column({ nullable: true })
  building_book?: string; // 微楼书

  @Column({ nullable: true })
  video_link?: string; // 视频链接

  @Column({ nullable: true })
  lastmodifybyid?: string; //最后修改人

  @Column({ nullable: true })
  createbyid?: string; //创建人

  @Column({ type: 'datetime', nullable: true })
  createtime?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastmodifytime?: Date;

  @Column({ nullable: true })
  is_deleted?: boolean;

  @BeforeInsert()
  generateCustomIDFunc() {
    const tableCode = 'a34'; // 表编号
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
