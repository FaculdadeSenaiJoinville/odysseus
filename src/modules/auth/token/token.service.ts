import { Injectable } from '@nestjs/common';
import { User } from 'src/core/database/entities';
import { BcryptHelper } from 'src/common/helpers';
import { TokenHelper } from './utils/token.helper';
import { Token } from '../../../core/database/entities/token.entity';
import { MySQLRepositoryService } from '../../../core/repository';

@Injectable()
export class TokenService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly tokenHelper: TokenHelper,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {

		const token = await this.tokenHelper.generateToken(user, expiresIn);

		await this.mysqlRepository.get(Token).delete({ user_id: user.id });

		const encryptedToken = await this.bcryptHelper.hashString(token);

		await this.mysqlRepository.get(Token).save(new Token(encryptedToken, user.id));

		return `Bearer ${token}`;
	}

	public async delete(token: string) {

		token = token.replace('Bearer ', '');

		const { id } = await this.tokenHelper.getUserData(token);

		this.mysqlRepository.get(Token).delete({ user_id: id });
	}

}
