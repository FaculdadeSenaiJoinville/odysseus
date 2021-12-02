import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDTO {

	@ApiProperty({ example: 'gabriel@gmail.com', description: 'E-mail do usuário.' })
	email: string;

}
