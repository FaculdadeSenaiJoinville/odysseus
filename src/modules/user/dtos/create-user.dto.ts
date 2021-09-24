import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../utils/users.type';

export class CreateUserDTO {

	@ApiProperty({ example: 'Gabriel Borges', description: 'Nome do usuário.' })
	name: string;

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

	@ApiProperty({ example: 'Teste@123', description: 'Senha do usuário.' })
	password: string;

	@ApiProperty({ example: 'Teste@123', description: 'Confirmação da senha do usuário.' })
	confirm_password: string;

	@ApiProperty({ example: 'ADMIN', description: 'Tipo do usuário.' })
	type: UserType;

}
