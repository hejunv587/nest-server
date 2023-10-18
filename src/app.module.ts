import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    ProjectsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 表示全局范围可用
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
        entities: [Project],
        synchronize: configService.get('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService], // 注入 ConfigService
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
