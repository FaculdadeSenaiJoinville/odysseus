import { User } from 'src/database/mysql/entities';
import { Connection } from 'typeorm';

export const userProvider = [
	{
		provide: 'USER_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(User),
		inject: ['MYSQL_CONNECTION'],
	},
];
