import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  // private projects: Project[] = [
  //   {
  //     id: '1',
  //     name: '联建产业园',
  //     manager: '陈力',
  //     department: '代理一部',
  //     area: '龙华区',
  //   },
  // ];
  private projects: Project[];

  // constructor() {
  //   // 读取 projects.json 文件的内容
  //   this.projects = this.loadProjects();
  // }

  private loadProjects(): void {
    try {
      const filePath = path.join(__dirname, 'projects.json');
      const data = fs.readFileSync(filePath, 'utf8');
      // const data = fs.readFileSync('./projects.json', 'utf8');
      this.projects = JSON.parse(data);

      // return JSON.parse(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      // 如果文件不存在或解析失败，返回一个空数组
      // return [];
      this.projects = [];
    }
    // return [
    //   {
    //     id: '1',
    //     name: '联建产业园',
    //     manager: '陈力',
    //     department: '代理一部',
    //     area: '龙华区',
    //   },
    // ];
  }

  onModuleInit() {
    // this.loadProjects(); // 在服务初始化时异步加载数据
  }

  constructor() {
    this.loadProjects();
    // 在构造函数中异步加载数据
  }

  // private async loadProjects(): Promise<void> {
  //   try {
  //     const data = await fs.promises.readFile('./projects.json', 'utf8');
  //     this.projects = JSON.parse(data);
  //   } catch (error) {
  //     // 如果文件不存在或解析失败，返回一个空数组
  //     this.projects = [];
  //   }
  // }

  private saveProjects(): void {
    // 将项目数据写入 projects.json 文件
    const filePath = path.join(__dirname, 'projects.json');
    fs.writeFileSync(filePath, JSON.stringify(this.projects, null, 2), 'utf8');
  }

  create(createProjectDto: CreateProjectDto) {
    const { id, name, ...otherProps } = createProjectDto;

    const newProject = { id, name, ...otherProps };

    this.projects.push(newProject);

    // 保存更改到文件
    this.saveProjects();

    return newProject;
  }

  findAll() {
    // this.projects = this.loadProjects();
    return this.projects;
  }

  findOne(id: string) {
    return this.projects.find((item) => item.id === id);
  }

  // update(id: string, updateProjectDto: UpdateProjectDto) {
  //   let project = this.findOne(id);

  //   project = { ...project, ...updateProjectDto };

  //   return project;
  // }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = this.findOne(id);

    if (!project) {
      return null; // 找不到项目
    }

    // 更新项目
    // type ProjectKeys  = keyof Project;
    // const allKeys: ProjectKeys[] = Object.keys(new Project()) as ProjectKeys[];

    // console.log('Project.prototype', allKeys);
    // for (const key in updateProjectDto) {
    //   // console.log('update', key);
    //   // if (key in project) {
    //   project[key] = updateProjectDto[key];
    //   // }
    //   // else if (projectKeys.includes(key)) {
    //   //   // 如果属性不在 project 中但在 Project 类的原型中定义，也将其添加到 project 中
    //   //   project[key] = updateProjectDto[key];
    //   // }
    // }

    // 使用部分对象更新
    Object.assign(project, updateProjectDto);

    // 保存更改到文件
    this.saveProjects();

    return project;
  }

  // remove(id: string) {
  //   return this.projects.filter((item) => item.id === id);
  // }

  remove(id: string) {
    const index = this.projects.findIndex((item) => item.id === id);

    if (index === -1) {
      return null; // 找不到项目
    }

    const removed = this.projects.splice(index, 1)[0];

    // 保存更改到文件
    this.saveProjects();

    return removed;
  }
}
