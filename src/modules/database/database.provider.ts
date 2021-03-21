import { createConnection } from 'typeorm';
import { mysqlConfig, mongoConfig } from 'src/database';

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
