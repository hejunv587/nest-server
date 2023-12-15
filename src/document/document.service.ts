import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import * as path from 'path';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async createDocumentWithFile(file: Express.Multer.File): Promise<Document> {
    const document = new Document();
    document.filename = file.originalname;
    // document.filePath = file.path;
    document.filePath = path.normalize(file.path);
    // document.filePath = path.join(__dirname, 'upload', file.originalname);
    // document.filePath = path.relative(__dirname, file.path);
    // Set other properties as needed
    document.createtime = new Date();
    document.lastmodifytime = new Date();
    document.is_deleted = false;

    return this.documentRepository.save(document);
  }

  // create(createDocumentDto: CreateDocumentDto) {
  //   return 'This action adds a new document';
  // }

  findAll() {
    return `This action returns all document`;
  }

  getDocumentById(id: string) {
    const is_deleted = false;
    return this.documentRepository.findOneBy({ id, is_deleted });
  }

  // async update(
  //   @Param('id') id: string,
  //   @Body() updateDocumentDto: UpdateDocumentDto,
  // ): Promise<Document> {
  //   console.log('updateDocumentDto', updateDocumentDto);
  //   updateDocumentDto.lastmodifytime = new Date();
  //   await this.documentRepository.update(id, updateDocumentDto);
  //   return this.documentRepository.findOneBy({ id });
  // }

  async remove(id: string): Promise<void> {
    const is_deleted = true;
    await this.documentRepository.update(id, { is_deleted });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} document`;
  // }
}
