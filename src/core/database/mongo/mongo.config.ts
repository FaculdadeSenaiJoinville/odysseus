import { join } from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

export const mongoConfig: TypeOrmModuleOptions  = {
	name: 'mongoConnection',
	type: 'mongodb',
	host: process.env.MONGO_HOST,
	port: parseInt(process.env.MONGO_PORT),
	username: process.env.MONGO_USER,
	password: process.env.MONGO_PASSWORD,
	database: process.env.MONGO_DATABASE,
	useUnifiedTopology: true,
	entities: [
		join(__dirname, 'entities', '*.entity.{ts,js}')
	],
	cli: {
		entitiesDir: join(__dirname, 'entities'),
	}
};
