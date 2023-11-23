import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Response } from 'express';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const document = await this.documentService.createDocumentWithFile(file);
    return { document };
  }

  // @Get()
  // findAll() {
  //   return this.documentService.findAll();
  // }

  @Get('download/:id')
  async downloadDocument(
    @Param('id') fileId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const document = await this.documentService.getDocumentById(fileId);

      if (!document) {
        throw new NotFoundException('Document not found');
      }

      // const filePath = document.filePath;
      // const fileStream = fs.createReadStream(filePath);

      // res.setHeader('Content-Disposition', `attachment; filename=${document.filename}`);
      // res.setHeader('Content-Type', 'application/octet-stream');

      // fileStream.pipe(res);

      const filePath = document.filePath;
      res.download(filePath, document.filename);
    } catch (error) {
      res
        .status(error.status || 500)
        .send(error.message || 'Internal Server Error');
    }
  }

  @Get('view/:id')
  async viewDocument(
    @Param('id') fileId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const document = await this.documentService.getDocumentById(fileId);

      if (!document) {
        throw new NotFoundException('Document not found');
      }

      const filePath = document.filePath;
      res.sendFile(filePath);
    } catch (error) {
      res
        .status(error.status || 500)
        .send(error.message || 'Internal Server Error');
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.documentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDocumentDto: UpdateDocumentDto,
  // ) {
  //   console.log(id)
  //   return this.documentService.update(id, updateDocumentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
