import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileAccessService } from './profileaccess.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProfileAccess } from './entities/profileaccess.entity';
// import { Access } from './entities/access.entity';
// import { Repository, In } from 'typeorm';
// import { Profile } from './entities/profile.entity';
import axios from 'axios';
import { WxSigninDTO } from './dto/wxSignin.dto';
import { WXBizDataCrypt } from '../utils/WXBizDataCrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private profileAccessService: ProfileAccessService, // @InjectRepository(ProfileAccess) // private readonly profileAccessRepository: Repository<ProfileAccess>, // @InjectRepository(Access) // private accessRepository: Repository<Access>,
  ) {}

  //https://api.weixin.qq.com/sns/jscode2session?appid=wxc990eb945a39ec86&secret=980465af4c5e4f705bb09dbab65c75ff&js_code="+lgcode+"&grant_type=authorization_code";
  private appid = 'wxc990eb945a39ec86';
  private secret = '980465af4c5e4f705bb09dbab65c75ff';
  private grant_type = 'authorization_code';

  async register(createUserDto: CreateUserDto): Promise<any> {
    const saltRounds = 10;
    const pwd = createUserDto.password;
    const hash = bcrypt.hashSync(pwd, saltRounds);
    createUserDto.password = hash;
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const email = username;
    const user = await this.userService.findOneByEmail(email);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // // TODO: Generate a JWT and return it here
    // // instead of the user object
    // return result;
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const res = bcrypt.compareSync(pass, user?.password); // true
    if (res) {
      // const { password, ...result } = user;
      // return result;
      const payload = {
        id: user.id,
        account: user.email,
        username: user.name,
        profile: user.profile,
        role: user.role,
        avatar: user.avatar,
      };
      console.log('signIn', user, payload);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new InternalServerErrorException('Invalid password');
    }
  }

  async wxSignIn(wxSignIn: WxSigninDTO) {
    const { code, iv, encryptedData } = wxSignIn;
    const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=${this.grant_type}&appid=${this.appid}&secret=${this.secret}&js_code=${code}`;
    // const info = await this.getInfo(url); // 获取openid和session_key
    const info = await axios.post(url);

    let token = '';
    // 如果openid不存在则为新用户
    const user = await this.userService.findOneByOpenid(info.data.openid);
    if (user) {
      const payload = {
        id: user.id,
        account: user.email,
        username: user.name,
        profile: user.profile,
        role: user.role,
        avatar: user.avatar,
      };
      token = await this.jwtService.signAsync(payload);
    } else {
      // 注册插入一条新信息
      const createUserDto: CreateUserDto = new CreateUserDto();
      if (encryptedData) {
        const pc = new WXBizDataCrypt(this.appid, info.data?.session_key);
        const data = pc.decryptData(encryptedData, iv);
        createUserDto.name = data.nickName;
        createUserDto.avatar = data.avatarUrl;
        createUserDto.gender = data.gender;
      }

      createUserDto.sessionkey = info.data?.session_key;
      createUserDto.openid = info.data.openid;
      createUserDto.isusing = true;
      createUserDto.profileId = 'aaa20230b18103906e7BzM';
      createUserDto.sessionkey = info.data?.session_key;
      const user = await this.userService.create(createUserDto);
      const payload = {
        id: user.id,
        username: user.name,
        profile: user.profile,
        avatar: user.avatar,
      };
      token = await this.jwtService.signAsync(payload);
    }
    return {
      access_token: token,
    };
    // return 'user';
  }

  // async getProfileAccess(profileId: string): Promise<Access[]> {
  // 通过一个profile id获取有哪些权限,或者是直接传入url,判断是否有权限
  async getProfileAccess(profileId: string) {
    const access = await this.profileAccessService.getAccessesByProfileId(
      profileId,
    );
    return access;
    // const profileAccesses = await this.profileAccessService.find({
    //   where: {
    //     profileId: profileId,
    //   },
    //   relations: ['access'],
    // });

    // // 然后从查询结果中取出access
    // const accesses = profileAccesses.map((pa) => pa.access);
    // return accesses;
    // const profileAccess = await this.profileAccessRepository.find({
    //   where: { profile: { id: profileId } },
    // });
    // if (!profileAccess.length) {
    //   throw new NotFoundException('Profile not found');
    // }
    // const accessIds = profileAccess.map((pa) => pa.access.id);
    // // return this.accessRepository.findByIds(accessIds);
    // return this.accessRepository.findBy({ id: In(accessIds) });
  }
}
