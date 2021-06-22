import { Injectable } from '@nestjs/common';
import { Token } from 'src/core/database/mongo/entities';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { TokenHelper } from './others/token.helper';
import { MongoRepositoryService } from 'src/core/repositories';

@Injectable()
export class TokenService {

	constructor(
		private readonly mongoRepository: MongoRepositoryService,
		private readonly tokenHelper: TokenHelper,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {

		const token = await this.tokenHelper.generateToken(user, expiresIn);

		await this.mongoRepository.get(Token).delete({ user_id: user.id });

		const encryptedToken = await this.bcryptHelper.hashString(token);

		await this.mongoRepository.get(Token).save(new Token(encryptedToken, user.id));

		return `Bearer ${token}`;
	}

	public async delete(token: string) {

		token = token.replace('Bearer ', '');

		const { id } = await this.tokenHelper.getUserData(token);

		this.mongoRepository.get(Token).delete({ user_id: id });
	}

}
