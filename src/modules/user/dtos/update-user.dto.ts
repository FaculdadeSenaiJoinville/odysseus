import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../utils/users.type';

export class UpdateUserDTO {

	@ApiProperty({ example: 'Gabriel Borges', description: 'Nome do usuário.' })
	name: string;

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

	@ApiProperty({ example: 'ADMIN', description: 'Tipo do usuário.' })
	type: UserType;

	@ApiProperty({ example: ['saas5as4a65as', 's48d4df1d5fd5f'], description: 'Lista com IDs dos grupos aos quais o usuário será adicionado.' })
	groups: string[];

	@ApiProperty({ example: ['saas5as4a65as', 's48d4df1d5fd5f'], description: 'Lista com IDs dos grupos dos quais o usuário será removido.' })
	groups_to_leave: string[];

}
