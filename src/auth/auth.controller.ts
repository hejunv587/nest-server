import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Patch,
  Delete,
  Param,
  Req,
  Res,
  UnauthorizedException,
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
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';
import * as svgCaptcha from 'svg-captcha';
import { Access } from './entities/access.entity';
import { WxSigninDTO } from './dto/wxSignin.dto';

@Controller('auth')
@ApiTags('权限接口')
export class AuthController {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private accessService: AccessService,
    private profileAccessService: ProfileAccessService,
    private roleService: RoleService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('captchaImage')
  @ApiOperation({ summary: '获取验证码图片', description: '获取验证码图片' })
  @Public()
  createCaptcha(@Req() req) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 44, //文字大小
      width: 92, //宽度
      height: 44, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    // res.type('image/svg+xml');
    // res.send(captcha.data);
    // const base64Image = `data:image/svg+xml;base64,${Buffer.from(
    //   captcha.data,
    // ).toString('base64')}`;
    const base64Image = Buffer.from(captcha.data).toString('base64');

    return {
      text: captcha.text,
      img: base64Image,
    };
  }

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
  @ApiOperation({ summary: '用户注册接口', description: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @Public()
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('wxlogin')
  @ApiOperation({ summary: '微信登陆接口', description: '微信小程序点击登录' })
  // @ApiBody({ code: string })
  @Public()
  wxSignIn(@Body() wxSignInDto: WxSigninDTO) {
    return this.authService.wxSignIn(wxSignInDto);
  }

  // @UseGuards(AuthGuard)
  @Get('getuserinfo')
  @ApiOperation({
    summary: '获取用户信息',
    description: '获取用户信息,根据token获取',
  })
  @ApiBearerAuth()
  getUserInfo(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException('用户未登录或者token无效');
    }

    return req.user;
  }

  @Post('profile')
  @ApiOperation({ summary: '新建简档', description: '创建简档' })
  @ApiBody({ type: ProfileDto })
  @ApiBearerAuth()
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
  @ApiBody({ type: Access })
  updateAccess(@Param('id') id: string, @Body() access: Access) {
    return this.accessService.updateAccess(id, access);
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
    console.log('getAccessByProfileId', profileid);
    return this.profileAccessService.getAccessesByProfileId(profileid);
  }

  @ApiOperation({
    summary: '新建角色关系',
    description: '新建角色关系,为user指定role,展现层级关系',
  })
  @Post('role')
  @ApiBody({ type: RoleDTO })
  @ApiBearerAuth()
  addRole(@Body() roleDTO: RoleDTO) {
    console.log('roleDTO', roleDTO);
    return this.roleService.createRoleWithHierarchy(roleDTO);
  }

  @ApiOperation({
    summary: '删除角色',
    description: '删除角色',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'role record ID' })
  @Delete('role/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
