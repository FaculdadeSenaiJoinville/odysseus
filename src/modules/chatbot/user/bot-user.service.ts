import { Injectable } from '@nestjs/common';
import { BaseMessage, SuccessSaveMessage } from '../../../common/types';
import { BotUser } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { UpsertBotUserDTO } from './dto/create-bot-user.dto';

@Injectable()
export class BotUserService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async create(body: UpsertBotUserDTO): Promise<SuccessSaveMessage> {

		const botUser = new BotUser(body);
		const savedUser = await this.mysqlRepository.save(BotUser, botUser);

		return {
			id: savedUser.id,
			message: 'Usuário criado com sucesso!'
		};
	}

	public async update(id: string, body: UpsertBotUserDTO): Promise<SuccessSaveMessage> {

		const user = await this.mysqlRepository.findOneOrFail(BotUser, id);
		
		user.name = body.name;
		user.email = body.email;
		user.chat_id = body.chat_id;

		const savedUser = await this.mysqlRepository.save(BotUser, user);

		return {
			id: savedUser.id,
			message: 'Usuário atualizado com sucesso!'
		}
	}

	public async remove(id: string): Promise<BaseMessage> {

		const user = await this.mysqlRepository.findOneOrFail(BotUser, id);

		await this.mysqlRepository.delete(BotUser, user.id);

		return {
			message: 'Usuário removido com sucesso!'
		};
	}

}
