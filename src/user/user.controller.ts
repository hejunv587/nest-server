import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { Public } from 'src/auth/public.decorator';

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

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '新建用户',
    description: '传入用户信息, 新建用户记录',
  })
  // @ApiBearerAuth()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '翻页查询所有客户',
    description: '传入各种筛选条件,翻页查询所有客户',
  })
  @ApiBearerAuth()
  // @ApiParam({ type: QueryParams })
  findAll(@Query() query: QueryUserDto) {
    // console.log('user findAll', query);
    return this.userService.findAll(query);
  }

  @Get('byname/:name')
  @ApiOperation({
    summary: '通过name查询客户',
    description: '传入用户name,查询客户',
  })
  @ApiBearerAuth()
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @Get('byid/:id')
  @ApiOperation({
    summary: '通过ID查询客户',
    description: '传入用户ID,查询客户',
  })
  @ApiBearerAuth()
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('byemail/:email')
  @ApiOperation({
    summary: '通过email查询客户',
    description: '传入用户email,查询客户',
  })
  @ApiBearerAuth()
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '修改客户信息',
    description: '传入用户id,修改对应客户',
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除客户记录',
    description: '传入用户id,删除客户记录',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
