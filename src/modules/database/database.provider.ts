import { join } from 'path';
import { createConnection } from 'typeorm';

const [mysql, mongo] = require('../../ormconfig.json');

const mysqlConfig = { ...mysql };
const mongoConfig = { ...mongo };

mysqlConfig.entities = [join(__dirname, 'mysql', 'entities', 'classes', '*.entity.{ts,js}')];
mysqlConfig.migrations = [join(__dirname, 'mysql', 'migrations', '*.{ts,js}')];
mysqlConfig.cli = {
	entitiesDir: join(__dirname, 'mysql', 'entities'),
	migrationsDir: join(__dirname, 'mysql', 'migrations')
};

mongoConfig.entities = [join(__dirname, 'mongo', 'entities', 'classes', '*.entity.{ts,js}')];
mongoConfig.migrations = [join(__dirname, 'mongo', 'migrations', '*.{ts,js}')];
mongoConfig.cli = {
	entitiesDir: join(__dirname, 'mongo', 'entities'),
	migrationsDir: join(__dirname, 'mongo', 'migrations')
};

export const databaseProvider = [
	{
		provide: 'MYSQL_CONNECTION',
		useFactory: async () => await createConnection(mysqlConfig),
	},
	{
		provide: 'MONGO_CONNECTION',
		useFactory: async () => await createConnection(mongoConfig),
	},
];
