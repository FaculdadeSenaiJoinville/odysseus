import { ApiProperty } from '@nestjs/swagger';

export class CreateTrailDTO {

	@ApiProperty({ example: 'Lógica de Programação', description: 'Nome da trilha.' })
	name: string;

	@ApiProperty({ example: 'Conceitos básicos de uma aplicação WEB', description: 'Descrição da trilha.' })
	description: string;

	@ApiProperty({ example: 'bone-off', description: 'Ícone da trilha.' })
	icon: string;

	@ApiProperty({ example: '#FFFFFF', description: 'Cor do Ícone.' })
	color: string;

}
