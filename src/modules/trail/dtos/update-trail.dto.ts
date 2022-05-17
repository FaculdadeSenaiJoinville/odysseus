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

export class UpdateTrailDTO {

	@ApiProperty({ example: 'Trilha de Lógica de Programação', description: 'Nome da trilha.' })
	name: string;

	@ApiProperty({ example: 'Trilha de Lógica de Programação', description: 'Descrição da trilha.' })
	description: string;

	@ApiProperty({ example: 'bone-off', description: 'Ícone da trilha.' })
	icon: string;

	@ApiProperty({ example: '8FA7B2', description: 'Cor da trilha.' })
	color: string;

	@ApiProperty({ example: 'PUBLISHED', description: 'Status da trilha.' })
	status: string;
	
	@ApiProperty({ example: true, description: 'Status da trilha.' })
	active: boolean;



}
