import { ApiProperty } from '@nestjs/swagger';

export class CreateIntentDTO {

	@ApiProperty({ example: 'Boas Vindas', description: 'Nome da intent.' })
	name: string;

	@ApiProperty({ example: ['Olá', 'Oi', 'Eae!'], description: 'Lista de frases de treinamento.' })
	training_phrases: string[];

	@ApiProperty({ example: 1000, description: 'Nível de prioridade da intent.' })
	priority: number;

	@ApiProperty({ example: true, description: 'Informa se a intent finalizará a interação com o usuário ou não.' })
	end_interaction: boolean;

}
