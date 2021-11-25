import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../../../core/database/entities';
import { UserType } from '../utils/users.type';

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

export class UpdateUserDTO {

	@ApiProperty({ example: 'Gabriel Borges', description: 'Nome do usuário.' })
	name: string;

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

	@ApiProperty({ example: 'ADMIN', description: 'Tipo do usuário.' })
	type: UserType;

	@ApiProperty({ example: true, description: 'Status do usuário' })
	active: boolean;

	@ApiProperty({ example: groupsExample, description: 'Lista com IDs dos grupos aos quais o usuário será adicionado.' })
	groups?: Group[];

	@ApiProperty({ example: groupsExample, description: 'Lista com IDs dos grupos dos quais o usuário será removido.' })
	groups_to_leave?: Group[];

}
