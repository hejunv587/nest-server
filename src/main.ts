import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
// import { AuthGuard } from './auth/auth.guard';
// import { JwtService } from '@nestjs/jwt';
import { Response } from './common/response';
import { HttpFilter } from './common/fillter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('process.env.NODE_ENV==>', process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);

  // 将 dist/public 目录设置为静态资源目录
  app.use('/public', express.static(path.join(__dirname, '..', '', 'upload')));

  // const jwtService = app.get(JwtService);
  // app.useGlobalGuards(new AuthGuard(jwtService));
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('瑞信行Nest接口文档')
    .setDescription('瑞信行后台')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // 允许访问的域名
    credentials: true, // 允许发送身份验证凭证（例如，cookie）
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
