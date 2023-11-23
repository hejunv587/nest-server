import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProjectfileModule } from './projectfile/projectfile.module';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ProjectsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 表示全局范围可用
      envFilePath: ['.env', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 导入 ConfigModule，以便获取配置
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: [Project],
        synchronize: configService.get('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService], // 注入 ConfigService
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../upload'),
        filename(req, file, cb) {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
          cb(null, file.originalname);
        },
      }),
    }),
    ProjectfileModule,
    DocumentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
