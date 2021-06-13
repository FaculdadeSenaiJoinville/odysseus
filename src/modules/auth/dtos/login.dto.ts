import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

    @ApiProperty({ example: 'Teste@123', description: 'Senha do usuário.' })
	password: string;

    @ApiProperty({ example: 84000, description: 'Tempo de validade do token que será gerado.' })
	expiresIn: number;

}
