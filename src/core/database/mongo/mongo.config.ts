import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const mongoConfig = {
	name: 'mongoConnection',
	type: 'mongodb',
	url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.${process.env.MONGO_URL_CONFIG}.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
	migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
	cli: {
		entitiesDir: join(__dirname, 'entities'),
		migrationsDir: join(__dirname, 'migrations')
	}
};
