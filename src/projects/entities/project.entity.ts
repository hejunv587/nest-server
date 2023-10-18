export class Project {
  id: string; // id
  name: string; // 项目名称
  area?: string; //区域
  address?: string; //项目地址
  department?: string; //所属部门,后续改为选择关联项
  manager?: string; //项目部门,后续改为选择关联项
  type?: string; // 租售类型,后续可以考虑改成enum类型
  status?: string; // 状态,后续可以考虑改成enum类型
  channelsettlementmethod?: string; //渠道结算方式,后续可以考虑改成enum类型
  description?: string; // 内容
  ownerid?: string; //所有人
  lastmodifybyid?: string; //最后修改人
  createtime?: Date;
  lastmodifytime?: Date;
}
