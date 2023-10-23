import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UploadedFile,
} from '@nestjs/common';
@Injectable()
export class FileNameEncodePipe implements PipeTransform {
  transform(
    @UploadedFile() value: Express.Multer.File,
    metadata: ArgumentMetadata,
  ) {
    console.log('value', value);
    // if (!/[^\u0000-\u00ff]/.test(value.originalname)) {
    //   value.originalname = Buffer.from(value.originalname, 'latin1').toString(
    //     'utf8',
    //   );
    // }
    return value;
  }
}
