
import * as fs from 'fs';
import { mongoConfig, mysqlConfig } from 'src/core/database';

mysqlConfig.entities = ['./src/core/database/mysql/entities/classes/*.entity.{ts,js}'];
mysqlConfig.migrations = ['./src/core/database/mysql/migrations/*.ts'];
mysqlConfig.cli = { 
  entitiesDir: './src/core/database/mysql/entities/classes',
  migrationsDir: './src/core/database/mysql/migrations'
};

mongoConfig.entities = ['./src/core/database/mongo/entities/classes/*.entity.{ts,js}'];
mongoConfig.migrations = ['./src/core/database/mongo/migrations/*.ts'];
mongoConfig.cli = { 
  entitiesDir: './src/core/database/mongo/entities/classes',
  migrationsDir: './src/core/database/mongo/migrations'
};

fs.writeFileSync(
  'ormconfig.json',
  `[${JSON.stringify(mysqlConfig, null, 2)},${JSON.stringify(mongoConfig, null, 2)}]`
);
