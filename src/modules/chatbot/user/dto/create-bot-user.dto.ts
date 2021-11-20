import { ApiProperty } from '@nestjs/swagger';

export class UpsertBotUserDTO {

	@ApiProperty({ example: 'Laura Helena', description: 'Nome do usuário.' })
	name: string;
	
	@ApiProperty({ example: 'laurahelena@gmail.com', description: 'Email do usuário.' })
	email: string;

	@ApiProperty({ example: 21313413, description: 'Id do chat.' })
	chat_id: number;

}
