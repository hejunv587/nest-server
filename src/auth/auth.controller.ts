import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from './public.decorator';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
// import { Access } from './entities/access.entity';
import { AccessDTO } from './dto/access.dto';
import { AccessService } from './access.service';
import { ProfileAccessDTO } from './dto/profileaccess.dto';
import { ProfileAccessService } from './profileaccess.service';

@Controller('auth')
@ApiTags('权限接口')
export class AuthController {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private accessService: AccessService,
    private profileAccessService: ProfileAccessService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: '登陆接口', description: '输入账号密码登陆' })
  @ApiBody({ type: SignInDto })
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '新建用户接口', description: '创建用户' })
  @Public()
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: '权限测试接口', description: '测试接口' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('profile')
  @ApiOperation({ summary: '新建简档', description: '创建简档' })
  @ApiBody({ type: ProfileDto })
  @Public()
  addProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(profileDto);
  }

  @Get('profile/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'id获取简档', description: 'id获取简档' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  getProfileById(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取简档', description: '获取简档' })
  getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  @Patch('profile/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改简档', description: '修改简档' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiBody({ type: ProfileDto })
  updateProfile(@Param('id') id: string, @Body() profileDTO: ProfileDto) {
    return this.profileService.updateProfile(id, profileDTO);
  }

  @ApiOperation({ summary: '删除简档', description: '删除简档' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @Delete('profile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.profileService.deleteProfile(id);
  }

  @Post('access')
  @ApiOperation({ summary: '新建权限', description: '新建权限' })
  @ApiBody({ type: AccessDTO })
  @ApiBearerAuth()
  addAccess(@Body() accessDto: AccessDTO) {
    return this.accessService.create(accessDto);
  }

  @Get('access/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'id获取权限', description: 'id获取权限' })
  @ApiParam({ name: 'id', description: 'access ID' })
  getAccessById(@Param('id') id: string) {
    return this.accessService.getAccessById(id);
  }

  @Patch('access/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改权限', description: '修改权限' })
  @ApiParam({ name: 'id', description: 'Access ID' })
  @ApiBody({ type: AccessDTO })
  updateAccess(@Param('id') id: string, @Body() accessDTO: AccessDTO) {
    return this.accessService.updateAccess(id, accessDTO);
  }

  @ApiOperation({ summary: '删除权限', description: '删除权限' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Access ID' })
  @Delete('access/:id')
  deleteAccess(@Param('id') id: string) {
    return this.accessService.deleteAccess(id);
  }

  @ApiOperation({
    summary: '新建简档权限关系',
    description: '新建简档权限关系,为profile指定access权限',
  })
  @Post('profileaccess')
  @ApiBody({ type: ProfileAccessDTO })
  @ApiBearerAuth()
  addProfileAccess(@Body() profileAccessDto: ProfileAccessDTO) {
    return this.profileAccessService.createProfileAccess(profileAccessDto);
  }

  @ApiOperation({
    summary: '删除简档权限关系',
    description: '删除简档权限关系',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'PrfileAccess ID' })
  @Delete('profileaccess/:id')
  deleteProfileAccess(@Param('id') id: string) {
    return this.profileAccessService.deleteProfileAccess(id);
  }

  @Get('profileaccess/:profileid')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'profile id获取对应权限',
    description: 'profile id获取对应权限',
  })
  @ApiParam({ name: 'profileid', description: 'profile ID' })
  getAccessByProfileId(@Param('profileid') profileid: string) {
    return this.profileAccessService.getAccessesByProfileId(profileid);
  }
}
