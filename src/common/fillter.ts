import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const currentTime = new Date();
    const beijingTime = currentTime.toLocaleString('en-US', {
      timeZone: 'Asia/Shanghai',
      hour12: false, // 24-hour format
    });

    response.status(status).json({
      message: exception.message,
      time: new Date().toLocaleString('cn', {
        timeZone: 'Asia/Shanghai',
        hour12: false, // 24-hour format
      }),
      success: false,
      path: request.url,
      status,
    });
  }
}
