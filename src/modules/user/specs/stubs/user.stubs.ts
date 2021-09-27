import { User } from 'src/core/database/entities';
import { UserType } from '../../utils/users.type';

export class UserStubs {

	public async getUserStub(active: boolean, user_type: UserType) {

		const user = new User();
        
		user.name = 'João da Silva Teste';
		user.email = 'joao.teste@gmail.com';
		user.password = 'João@123';
		user.active = active;
		user.type = user_type;

		return user;
	}

}
