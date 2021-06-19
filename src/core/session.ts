import { User } from "./database/mysql/entities";

export const session = {

	getUser(): User {

		return global.app_session.user;
	}
};
