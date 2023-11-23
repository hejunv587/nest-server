import { IsNumber, IsString } from 'class-validator';

export class CreateProjectfileDto {
  @IsString()
  name: string; // 项目名称

  @IsString()
  district?: string; //区域

  @IsString()
  sub_district?: string; //细分区域

  @IsString()
  address?: string; //项目地址

  @IsString()
  project_type?: string; //项目类型,代理项目,一般代理项目,市场项目?

  @IsString()
  completion_date?: string; //竣工时间

  @IsString()
  area_range?: string; //面积区间,"200-2126㎡"

  @IsNumber()
  reference_price?: number; //参考价

  @IsString()
  lease_sale_type?: string; // 租售类型,后续可以考虑改成enum类型

  @IsNumber()
  building_footprint?: number; // 项目占地面积

  @IsNumber()
  total_building_area?: number; // 项目总建筑面积

  @IsNumber()
  building_height?: number; // 建筑高度

  @IsNumber()
  aboveground_floors: number; // 地上层数

  @IsNumber()
  underground_floors: number; // 地下层数

  @IsNumber()
  calculated_building_area: number; // 计容建筑面积

  @IsNumber()
  apartment_area?: number; // 计容公寓面积

  @IsNumber()
  commercial_area?: number; //计容商业面积

  @IsNumber()
  office_area?: number; //计容办公面积

  @IsNumber()
  hotel_area?: number; //计容酒店面积

  @IsNumber()
  ground_parking?: number; // 地面停车位数量

  @IsNumber()
  underground_parking?: number; //地下停车位数量

  @IsString()
  parking_charges?: string; //停车收费标准

  @IsString()
  property_company?: string; //物业公司

  @IsString()
  management_fees?: string; //物业费

  @IsString()
  charging_piles?: string; //充电桩

  @IsString()
  elevator_brand?: string; //电梯品牌

  @IsString()
  elevator_number?: string; //电梯数量

  @IsString()
  floor_height?: number; //标准层净高

  @IsString()
  utility_rate?: string; //实用率

  @IsString()
  exterior_facade1: string; //外立面1

  @IsString()
  exterior_facade2: string; //外立面2

  @IsString()
  exterior_facade3: string; //外立面3

  @IsString()
  exterior_facade4: string; //外立面4

  @IsString()
  exterior_facade5: string; //外立面5

  @IsString()
  exterior_facade6: string; //外立面6

  @IsString()
  renderings1: string; //效果图1

  @IsString()
  renderings2: string; //效果图2

  @IsString()
  renderings3: string; //效果图3

  @IsString()
  floor_plan1: string; //户型图1

  @IsString()
  floor_plan2: string; //户型图2

  @IsString()
  floor_plan3: string; //户型图3

  @IsString()
  floor_plan4: string; //户型图4

  @IsString()
  floor_plan5: string; //户型图5

  @IsString()
  floor_plan6: string; //户型图6

  @IsString()
  public_area1: string; //公共区1

  @IsString()
  public_area2: string; //公共区2

  @IsString()
  public_area3: string; //公共区3

  @IsString()
  public_area4: string; //公共区5

  @IsString()
  public_area5: string; //公共区5

  @IsString()
  public_area6: string; //公共区6

  @IsString()
  airconditioner_brand?: string; //空调品牌

  @IsString()
  airconditioner_cost?: string; //空调费用

  @IsString()
  settled_companies?: string; //入驻企业

  @IsString()
  building_book?: string; // 微楼书

  @IsString()
  video_link?: string; // 视频链接

  //   lastmodifybyid?: string; //最后修改人

  //   createbyid?: string; //创建人

  //   createtime?: Date;

  //   lastmodifytime?: Date;

  //   is_deleted?: boolean;
}
