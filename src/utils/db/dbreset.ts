import { createConnection } from 'typeorm';
import ormConfig from './dbconfig';
import { Project } from '../../projects/entities/project.entity';

const reset = async () => {
  const connection = await createConnection(ormConfig);

  await connection.createQueryBuilder().delete().from(Project).execute();
};

reset()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
