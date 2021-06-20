import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {

	@ApiProperty({ example: 'Gabriel Borges', description: 'Nome do usuário.' })
    name: string;

    @ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

    @ApiProperty({ example: 'Teste@123', description: 'Senha do usuário.' })
	password: string;

}
