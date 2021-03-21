import { mysql, mongo } from '../database/orm.config';
import * as fs from 'fs';

const mysqlConfig = { ...mysql };
const mongoConfig = { ...mongo };

mysqlConfig.entities = ['./src/database/mysql/entities/classes/*.entity.{ts,js}'];
mysqlConfig.migrations = ['./src/database/mysql/migrations/*.ts'];
mysqlConfig.cli = { 
  entitiesDir: './src/database/mysql/entities/classes',
  migrationsDir: './src/database/mysql/migrations'
};

mongoConfig.entities = ['./src/database/mongo/entities/classes/*.entity.{ts,js}'];
mongoConfig.migrations = ['./src/database/mongo/migrations/*.ts'];
mongoConfig.cli = { 
  entitiesDir: './src/database/mongo/entities/classes',
  migrationsDir: './src/database/mongo/migrations'
};

fs.writeFileSync(
  'ormconfig.json',
  `[${JSON.stringify(mysqlConfig, null, 2)},${JSON.stringify(mongoConfig, null, 2)}]`
);
