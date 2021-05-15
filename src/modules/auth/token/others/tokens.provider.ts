import { Token } from 'src/core/database/mongo/entities';
import { Connection } from 'typeorm';

export const tokenProvider = [
	{
		provide: 'TOKEN_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Token),
		inject: ['MONGO_CONNECTION'],
	},
];
