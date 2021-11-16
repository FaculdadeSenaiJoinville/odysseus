import { ApiProperty } from '@nestjs/swagger';

export class UpsertContentDTO {

	@ApiProperty({ example: 'Lógica de programação', description: 'Nome da conteúdo.' })
	name: string;

	@ApiProperty({ example: 'A lógica de programação é...', description: 'Explicação do conteúdo.' })
	explanation: string;

	@ApiProperty({ example: 'https://aprenda-logica-de-programacao.com', description: 'Link do conteúdo.' })
	link: string;

}
