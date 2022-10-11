import { ApiProperty } from '@nestjs/swagger';
import { User, Trail } from '../../../core/database/entities';

const membersExample = [
	{
		id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
		name: 'Usuário de teste 1'
	},
	{
		id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9',
		name: 'Usuário de teste 2'
	}
];

export class UpsertGroupDTO {

	@ApiProperty({ example: 'Turma ADS 2019', description: 'Nome do grupo.' })
	name: string;

	@ApiProperty({ example: 'Turma de ADS do primeiro semestre de 2019', description: 'Descrição do grupo.' })
	description?: string;

	@ApiProperty({ example: membersExample, description: 'Lista com IDs dos membros do grupo.' })
	members?: User[];

	@ApiProperty({ example: membersExample, description: 'Lista com IDs dos membros que serão removidos do grupo.' })
	members_to_remove?: User[];

	@ApiProperty({ example: membersExample, description: 'Lista com IDs dos membros do grupo.' })
	trails?: Trail[];

	@ApiProperty({ example: membersExample, description: 'Lista com IDs dos membros que serão removidos do grupo.' })
	trails_to_remove?: Trail[];

}
