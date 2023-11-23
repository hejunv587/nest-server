import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { ProfileAccessService } from './profileaccess.service';
import { Access } from './entities/access.entity';

const white = ['/code', '/login', '/menu', '/admin/user/:id', '/cloud/flow']; //白名单

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private profileAccessService: ProfileAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;

      // 获取用户profileid
      const profile = request.user.profile; //登录成功的时候会在session上写入用户的角色ID

      const path = request.route.path; //请求的url 如果是restful风格的/user/:id 例如（请求路径是/user/12313 此时得到的是/user/:id）

      const method = request.method;

      //超级管理员拥有所有权限 或者 白名单中
      if (white.indexOf(path) !== -1 || profile?.profile_name === '管理员') {
        return true;
      } else {
        if (!profile) {
          throw new HttpException('请重新登陆以获取授权', HttpStatus.FORBIDDEN);
        }
        const access: Access[] =
          await this.profileAccessService.getAccessesByProfileId(profile);

        if (access instanceof Array && access.length > 0) {
          const hasAuth = access.some(
            (r) => r.req_url === path && r.req_method === method,
          );

          if (hasAuth) {
            return true;
          } else {
            throw new HttpException(
              '暂无权限,请联系管理员',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException(
            '暂无权限,请联系管理员',
            HttpStatus.FORBIDDEN,
          );
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
