// import 'reflect-metadata';
import { createConnection, Repository } from 'typeorm';
// import * as lodash from 'lodash';
import { getRandomProjects } from './random';
import { Project } from '../../projects/entities/project.entity';
import ormConfig from './dbconfig';

const checkExist = async (projectRepository: Repository<Project>) => {
  console.log('检查是否已初始化...');

  const projectNum = await projectRepository.count();
  const exist = projectNum > 0;

  if (exist) {
    console.log(`已存在 ${projectNum} 条用户数据，不再初始化。`);
    return true;
  }

  return false;
};

const seed = async () => {
  console.log('开始插入数据...');
  const connection = await createConnection(ormConfig);

  const projectRepository = connection.getRepository<Project>(Project);

  const dataExist = await checkExist(projectRepository);

  if (dataExist) {
    return;
  }

  console.log('生成初始化数据...');
  const initProjects = getRandomProjects();

  console.log('插入初始化数据...');
  await projectRepository.save(initProjects);

  console.log('数据初始化成功！');
};

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
