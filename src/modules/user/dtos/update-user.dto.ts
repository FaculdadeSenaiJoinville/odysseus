import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../others/users.type';

export class UpdateUserDTO {

	@ApiProperty({ example: 'Gabriel Borges', description: 'Nome do usuário.' })
	name: string;

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

	@ApiProperty({ example: 'ADMIN', description: 'Tipo do usuário.' })
	type: UserType;

	@ApiProperty({ example: true, description: 'Status do usuário' })
	active: boolean;

}
