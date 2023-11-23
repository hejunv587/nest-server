import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileAccessService } from './profileaccess.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileAccess } from './entities/profileaccess.entity';
import { Access } from './entities/access.entity';
import { Repository, In } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private profileAccessService: ProfileAccessService, // @InjectRepository(ProfileAccess)
  ) // private readonly profileAccessRepository: Repository<ProfileAccess>,
  // @InjectRepository(Access)
  // private accessRepository: Repository<Access>,
  {}

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
    const res = bcrypt.compareSync(pass, user?.password); // true
    if (res) {
      // const { password, ...result } = user;
      // return result;
      const payload = { sub: user.id, username: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
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
