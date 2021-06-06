import { Injectable } from '@nestjs/common';
import { Token } from 'src/core/database/mongo/entities';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { TokenHelper } from './others/token.helper';
import { getConnectionManager, getRepository } from 'typeorm';
import { RepositoryService } from 'src/core/repository/repository.service';

@Injectable()
export class TokenService {

	constructor(
		private readonly repositoryService: RepositoryService,
		private readonly tokenHelper: TokenHelper,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {

		const token = await this.tokenHelper.generateToken(user, expiresIn);

		await this.repositoryService.mongo(Token).delete({ user_id: user.id });

        const encryptedToken = await this.bcryptHelper.hashString(token);

        await this.repositoryService.mongo(Token).save(new Token(encryptedToken, user.id));

		return `Bearer ${token}`;
	}

	public async delete(token: string) {

		token = token.replace('Bearer ', '');

		const { id } = await this.tokenHelper.getUserData(token);

		this.repositoryService.mongo(Token).delete({ user_id: id });
	}

}
