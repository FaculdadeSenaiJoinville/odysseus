import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../../../core/database/entities';

const groupsExample = [
	{
		id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
		name: 'Grupo de teste 1'
	},
	{
		id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9',
		name: 'Grupo de teste 2'
	}
];

export class CreateTrailDTO {

	@ApiProperty({ example: 'Lógica de Programação', description: 'Nome da trilha.' })
	name: string;

	@ApiProperty({ example: 'Conceitos básicos de uma aplicação WEB', description: 'Descrição da trilha.' })
	description: string;

	@ApiProperty({ example: 'Ícone da trilha', description: 'Ícone da trilha.' })
	icon: string;

	@ApiProperty({ example: 'Cor do Ícone', description: 'Cor do Ícone.' })
	color: string;

}
