
import { createConnection } from 'typeorm';
import { BcryptHelper } from '../../../common/helpers';
import { UserType } from '../../../modules/user/utils/users.type';
import { User } from '../entities';

createConnection('mysqlConnection')
	.then(async connection => {

		const repository = connection.getRepository(User);
		const bcryptHelper = new BcryptHelper();
		const user = repository.create({
			name: 'Master Odyssey',
			email: 'master@odyssey.com.br',
			password: await bcryptHelper.hashString('FirstLogin@123'),
			type: UserType.ADMIN
		});

		await repository.save(user);

		connection.close();
		process.exit();
	})
	.catch(error => {

		console.error(error);
		process.exit();
	});
