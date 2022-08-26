import { ApiProperty } from '@nestjs/swagger';
import { Group, User } from 'src/core/database/entities';
import { TrailsType } from '../utils/trails.type';

const usersExample = [
	{
		id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
		name: 'Usuário de teste 1'
	},
	{
		id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9',
		name: 'Usuário de teste 2'
	}
];
const groupsExample = [
	{
		id: 'a2fa29bfd5351b5b7ccacbc9f7c',
		name: 'Grupo de teste 1'
	},
	{
		id: '6c8923b6933bb7c36f08e7870c0',
		name: 'Grupo de teste 2'
	}
];
export class UpdateAccessTrailDTO {
	
	@ApiProperty({ example: usersExample, description: 'Lista com IDs dos membros da trilha.' })
	users?: User[];

	@ApiProperty({ example: usersExample, description: 'Lista com IDs dos membros que serão removidos da trilha.' })
	users_to_remove?: User[];

	@ApiProperty({ example: groupsExample, description: 'Lista com IDs dos grupos da trilha.' })
	groups?: Group[];

	@ApiProperty({ example: groupsExample, description: 'Lista com IDs dos grupos que serão removidos da trilha.' })
	groups_to_remove?: Group[];
}
export class UpdateTrailDTO {

	@ApiProperty({ example: 'Trilha de Lógica de Programação', description: 'Nome da trilha.' })
	name: string;

	@ApiProperty({ example: 'Trilha de Lógica de Programação', description: 'Descrição da trilha.' })
	description: string;

	@ApiProperty({ example: 'bone-off', description: 'Ícone da trilha.' })
	icon: string;

	@ApiProperty({ example: '8FA7B2', description: 'Cor da trilha.' })
	color: string;
	
	@ApiProperty({ example: true, description: 'Status da trilha.' })
	active: boolean;



}
