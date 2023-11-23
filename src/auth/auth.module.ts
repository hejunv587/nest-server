import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
// import { ProfileService } from './profile.service';
import { AccessService } from './access.service';
import { ProfileAccessService } from './profileaccess.service';
import { Profile } from './entities/profile.entity';
import { Access } from './entities/access.entity';
import { ProfileAccess } from './entities/profileaccess.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forFeature([Profile, Access, ProfileAccess]),
    TypeOrmModule.forFeature([Profile, Access, ProfileAccess]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '480m' },
    }),
  ],
  providers: [AuthService, ProfileService, AccessService, ProfileAccessService],
  // providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, ProfileService, AccessService, ProfileAccessService],
  // exports: [AuthService],

})
export class AuthModule {}
