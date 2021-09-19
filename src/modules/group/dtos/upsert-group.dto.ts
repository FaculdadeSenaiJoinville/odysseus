import { ApiProperty } from '@nestjs/swagger';

export class UpsertGroupDTO {

	@ApiProperty({ example: 'Turma ADS 2019', description: 'Nome do grupo.' })
	name: string;

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'Descrição do grupo.' })
	description: string;

	@ApiProperty({ example: ['ad4asdasd1as', 'aas4v4x4c6v'], description: 'Lista com IDs dos membros do grupo.' })
	members: string[];

}
