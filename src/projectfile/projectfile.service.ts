import { Body, Injectable, Param } from '@nestjs/common';
import { CreateProjectfileDto } from './dto/create-projectfile.dto';
import { UpdateProjectfileDto } from './dto/update-projectfile.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectFile } from './entities/projectfile.entity';

@Injectable()
export class ProjectfileService {
  constructor(
    @InjectRepository(ProjectFile)
    private projectfileRepository: Repository<ProjectFile>,
  ) {}

  async create(createProjectfileDto: CreateProjectfileDto) {
    const projectfile = this.projectfileRepository.create(createProjectfileDto);
    return this.projectfileRepository.save(projectfile);
  }

  async findAll(): Promise<ProjectFile[]> {
    return this.projectfileRepository.find();
  }

  async findOne(id: string): Promise<ProjectFile> {
    return this.projectfileRepository.findOneBy({ id });
  }

  async update(
    @Param('id') id: string,
    @Body() updateProjectfileDto: UpdateProjectfileDto,
  ): Promise<ProjectFile> {
    await this.projectfileRepository.update(id, updateProjectfileDto);
    return this.projectfileRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.projectfileRepository.delete(id);
  }
}
