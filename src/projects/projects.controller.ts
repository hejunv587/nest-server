import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('案场项目接口')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    console.log('createProjectDto', createProjectDto);
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({
    summary: '获取全部案场项目接口',
    description: '获取全部案场项目接口',
  })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({
    summary: 'id获取一个案场项目数据接口',
    description: 'id获取一个案场项目数据接口',
  })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
