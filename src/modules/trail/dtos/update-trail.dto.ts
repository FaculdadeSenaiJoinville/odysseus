import { ApiProperty } from '@nestjs/swagger';

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
