import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectfileService } from './projectfile.service';
import { CreateProjectfileDto } from './dto/create-projectfile.dto';
import { UpdateProjectfileDto } from './dto/update-projectfile.dto';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('项目档案接口')
@Controller('projectfile')
export class ProjectfileController {
  constructor(private readonly projectfileService: ProjectfileService) {}

  @Post()
  create(@Body() createProjectfileDto: CreateProjectfileDto) {
    return this.projectfileService.create(createProjectfileDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.projectfileService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.projectfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectfileDto: UpdateProjectfileDto,
  ) {
    return this.projectfileService.update(id, updateProjectfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectfileService.remove(id);
  }
}
