export class CreateUserDto {
  name: string; //姓名
  email: string; //邮箱
  mobile: string; //手机
  password: string; //密码
  profile: string; //简档(权限控制)
  rzsj: Date; //入职日期
  lzrq: Date; //离职日期
  role: string; //角色,部门及上下级关系
  isusing: boolean; //是否启用
  gh: string; //工号
  level: string; //职级职等
  manager: string; //经理
  avatar: string; //头像id

  ownerid?: string; //所有人

  lastmodifybyid?: string; //最后修改人

  createtime?: Date;

  lastmodifytime?: Date;

  is_deleted?: boolean;
}
