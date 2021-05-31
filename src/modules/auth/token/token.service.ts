import { Injectable } from '@nestjs/common';
import { Token } from 'src/core/database/mongo/entities';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { TokenHelper } from './others/token.helper';
import { getConnectionManager, getRepository } from 'typeorm';

@Injectable()
export class TokenService {

	constructor(
		private readonly tokenHelper: TokenHelper,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {

		const token = await this.tokenHelper.generateToken(user, expiresIn);

		await getConnectionManager().get('mongoConnection').getRepository(Token).delete({ user_id: user.id });

        const encryptedToken = await this.bcryptHelper.hashString(token);

        await getConnectionManager().get('mongoConnection').getRepository(Token).save(new Token(encryptedToken, user.id));

		return `Bearer ${token}`;
	}

	public async delete(token: string) {

		token = token.replace('Bearer ', '');

		const { id } = await this.tokenHelper.getUserData(token);

		getConnectionManager().get('mongoConnection').getRepository(Token).delete({ user_id: id });
	}

}
