import { createConnection } from 'typeorm';
const connectionsConfigs = require('.');

const { mongoConfig, mysqlConfig } = connectionsConfigs;

export const databaseProvider = [
	{
		provide: 'MONGO_CONNECTION',
		useFactory: async () => await createConnection(mongoConfig)
	},
	{
		provide: 'MYSQL_CONNECTION',
		useFactory: async () => await createConnection(mysqlConfig)
	}
];
