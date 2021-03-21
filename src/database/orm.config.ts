import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const mysql: TypeOrmModuleOptions = {
	name: 'mysqlConnection',
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT),
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};

export const mongo: TypeOrmModuleOptions = {
	name: 'mongoConnection',
	type: 'mongodb',
	url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.${process.env.MONGO_URL_CONFIG}.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
