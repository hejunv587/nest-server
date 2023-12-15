import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// interface QueryParams {
//   pageNum: number;
//   pageSize: number;
//   name?: string;
//   mobile?: string;
//   isusing?: boolean;
//   beginTime?: string;
//   endTime?: string;
//   dateRange?: string[]; // 假设这是一个字符串数组，包含开始和结束时间
// }

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto as DeepPartial<User>);
    return this.userRepository.save(user);
  }

  async findAll(query: QueryUserDto) {
    // return `This action returns all user`;
    // 返回全部用户
    // const total = await this.userRepository.count();
    // const rows = await this.userRepository.find();
    // return { total, rows };
    // return this.userRepository.find();

    const { pageNum, pageSize, name, mobile, isusing, beginTime, endTime } =
      query;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }
    if (mobile) {
      queryBuilder.andWhere('user.mobile LIKE :mobile', {
        mobile: `%${mobile}%`,
      });
    }

    if (isusing !== undefined) {
      queryBuilder.andWhere('user.isusing = :isusing', { isusing });
    }

    if (beginTime) {
      queryBuilder.andWhere('user.createTime >= :beginTime', { beginTime });
    }

    if (endTime) {
      queryBuilder.andWhere('user.createTime <= :endTime', { endTime });
    }

    const results = await queryBuilder
      .leftJoinAndSelect('user.profile', 'profile') // 替换 "yourEntity" 和 "profile" 为你实际的实体和关系属性
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const total = results?.length || 0;
    const rows = results;

    return { total, rows };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneById(id: string) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOneBy({ name });
  }

  findOneByEmail(email: string) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }

  findOneByOpenid(openid: string) {
    return this.userRepository.findOneBy({ openid });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
