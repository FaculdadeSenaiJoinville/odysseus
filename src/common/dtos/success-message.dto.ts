import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageDTO {

	@ApiProperty({ example: 'Registro atualizado com sucesso!', description: 'Mensagem de sucesso.' })
	message: string;

}
