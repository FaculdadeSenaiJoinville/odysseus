import { ApiProperty } from '@nestjs/swagger';

export class UpsertHistoryDTO {

	@ApiProperty({ example: 'João de Teste', description: 'Nome do usuário.' })
	user_name: string;

	@ApiProperty({ example: 'Olá, o que é logica de programação?', description: 'Mensagem do usuário.' })
	user_message: string;

	@ApiProperty({ example: 1750910624, description: 'Id do chat.' })
	chat_id: number;

	@ApiProperty({ example: '{["Olá", "https://aprenda-logica-de-programacao.com"]}', description: 'Mensagens de resposta do bot.' })
	bot_response: string;

}
