# 笔记

## ToDoList
- [x] 基本的curd
- [x] 基于本地json文件的curd
- [x] typeorm连接mysql的curd
- [x] nest config和配置文件env,使用 ConfigModule 读取本地 ENV 变量
- [x] 数据库的脚本,重置数据库,mockjs产生初始数据库数据
- [ ] 更准确的数据库字段定义,以及真实数据的迁移
- [ ] 后续crm数据迁移方案,以及并行方案
- [x] 数据库的id 自定义格式, 一些时间字段自动产生
- [ ] 加入user表及更多的表,表的关联等实现
- [ ] user的auth实现,登陆,身份验证,路由及接口权限的控制,表,记录甚至字段的权限控制
- [ ] nestjs的测试jest?e2e?
- [x] 上传文件, 中文名乱码
- [x] 生产部署(尝试上线,放在公司win服务器上,pm2运行,iis重定向,可正常范闻,连接数据库)
- [x] 静态资源访问(图片,视频等文件)
- [x] 项目档案模块(项目档案增删改查,实现小瑞通项目展示所需的后台部分)
- [x] user用户表,实现登陆,auth及jwt
- [ ] 微信登陆
- [ ] Role-Based Access Control (RBAC), 实现crm类似的角色,简档等权限控制,甚至达到字段级别的控制
- [x] 封装返回和报错


## 知识点

### 唯一id, 自增id/uuid/雪花算法.  这里自定义一套,表编号+年+时间+随机字符

### upoad使用的Multer, 会有中文乱码问题
```
file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
```
### 生产部署
    在本地build后复制package.json和dist上服务器,然后进行npm node模块安装,最后启动写启动脚本, 用pm2启动管理, 在windos iis上设置绑定关系. 

### 使用certify ssl/tls 申请ssl证书
    有http和dns两种, dns要求域名修改txt记录,手动添加后重新申请即可通过


### 静态资源访问
    利用express实现静态资源访问
    ```
    app.use('/public', express.static(path.join(__dirname, '..', '', 'upload'))); 
    ```

### User,jwt,rbac
    1.创建user和auth;


### Nestjs
    1.其他module要用到A module中的service时候, 要exports出去;
    2.添加全局guard,
    ```
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ``` 
    3.通过NestInterceptor和fillter实现返回信息的封装;
    

### Mysql
    1. DATE(date_column) = CURDATE()




### CRM
    1.tp_sys_profile_infoset 这个表里面记录了profile和记录类型之间的关系;
      tp_sys_profile_field  记录了profile和表字段的权限关系;
      tp_sys_profile_layout  profile和布局的关系;
      tp_sys_role 角色表, 可以展现层级关系
      