import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const mysqlConfig = {
	name: 'mysqlConnection',
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT),
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
	migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
	cli: {
		entitiesDir: join(__dirname, 'entities'),
		migrationsDir: join(__dirname, 'migrations')
	}
};
