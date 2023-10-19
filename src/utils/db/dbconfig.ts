import { Project } from '../../projects/entities/project.entity';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  database: 'nestjsdb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  entities: [Project],
};

export default ormConfig;
