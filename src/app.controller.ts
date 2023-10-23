import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { FileNameEncodePipe } from './filename.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(200)
  postHello(): string {
    return this.appService.postHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // 对文件名进行 UTF-8 编码解码
    // const originalname = Buffer.from(file.originalname, 'latin1').toString(
    //   'utf8',
    // );

    return {
      file: file.originalname,
    };
  }
}
