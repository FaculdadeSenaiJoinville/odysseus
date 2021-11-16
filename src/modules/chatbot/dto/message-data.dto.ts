import { ApiProperty } from '@nestjs/swagger';

export class MessageDataDTO {

	@ApiProperty({ example: 'O que é Lógica de programação?', description: 'Mensagem do usuário.' })
	message: string;

	@ApiProperty({ example: ['3145ca28-4906-494b-9774-766a7a3f0ca0'], description: 'Lista de frases de treinamento.' })
	session_id: string;

	@ApiProperty({ example: 'pt-br', description: 'Idioma da mensagem.' })
	language_code?: string;

}
