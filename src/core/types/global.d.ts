import { User } from '../database/mysql/entities';

declare global {

	namespace NodeJS {

		interface Global {
			
			readonly app_session: {
				user: User;
			}
		}
	}
}
