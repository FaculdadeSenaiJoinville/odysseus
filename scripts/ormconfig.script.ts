
import * as fs from 'fs';
import { mongoConfig, mysqlConfig } from 'src/core/database';

const mongo = {
	...mongoConfig,
	entities: ['./src/core/database/mongo/entities/*.entity.{ts,js}'],
	cli: { 
		entitiesDir: './src/core/database/mongo/entities'
	}
};

const mysql = {
	...mysqlConfig,
	entities: ['./src/core/database/mysql/entities/*.entity.{ts,js}'],
	migrations: ['./src/core/database/mysql/migrations/*.ts'],
	cli: { 
		entitiesDir: './src/core/database/mysql/entities',
		migrationsDir: './src/core/database/mysql/migrations'
	}
};

fs.writeFileSync(
	'ormconfig.json',
	`[${JSON.stringify(mongo, null, 2)},${JSON.stringify(mysql, null, 2)}]`
);
