import { Injectable } from '@nestjs/common';
import { BaseMessage, SuccessSaveMessage } from '../../../common/types';
import { BotContent } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { UpsertContentDTO } from './dto/create-content.dto';

@Injectable()
export class BotContentService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async create(body: UpsertContentDTO): Promise<SuccessSaveMessage> {

		const botContent = new BotContent(body);
		const savedContent = await this.mysqlRepository.save(BotContent, botContent);

		return {
			id: savedContent.id,
			message: 'Conteúdo criado com sucesso!'
		};
	}

	public async update(id: string, body: UpsertContentDTO): Promise<SuccessSaveMessage> {

		const content = await this.mysqlRepository.findOneOrFail(BotContent, id);
		
		content.name = body.name;
		content.explanation = body.explanation;
		content.link = body.link;

		const savedContent = await this.mysqlRepository.save(BotContent, content);

		return {
			id: savedContent.id,
			message: 'Conteúdo atualizado com sucesso!'
		}
	}

	public async remove(id: string): Promise<BaseMessage> {

		const content = await this.mysqlRepository.findOneOrFail(BotContent, id);

		await this.mysqlRepository.delete(BotContent, content.id);

		return {
			message: 'Conteúdo removido com sucesso!'
		};
	}

}
