
import * as fs from 'fs';
import { mysqlConfig } from 'src/core/database';

const mysql = {
	...mysqlConfig,
	entities: ['./src/core/database/entities/*.entity.{ts,js}'],
	migrations: ['./src/core/database/migrations/*.ts'],
	cli: { 
		entitiesDir: './src/core/database/entities',
		migrationsDir: './src/core/database/migrations'
	}
};

fs.writeFileSync(
	'ormconfig.json',
	`[${JSON.stringify(mysql, null, 2)}]`
);
