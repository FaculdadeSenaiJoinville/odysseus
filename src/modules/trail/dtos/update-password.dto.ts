import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {

	@ApiProperty({ example: 'Teste@123', description: 'Senha nova.' })
	password: string;

	@ApiProperty({ example: 'Teste@123', description: 'Confirmação da senha nova.' })
	confirm_password: string;

}
