import { ApiProperty } from '@nestjs/swagger';

export class UpsertIntentDTO {

	@ApiProperty({ example: 'Boas Vindas', description: 'Nome da intent.' })
	name: string;

	@ApiProperty({ example: ['Olá', 'Oi', 'Eae!'], description: 'Lista de frases de treinamento.' })
	training_phrases: string[];

	@ApiProperty({ example: 'Olá, seja bem vindo!', description: 'Resposta simples da intent.' })
	message?: string;

	@ApiProperty({ example: ['25ac432a-8fd0-414b-8044-bd6bdb51bfebOlá', '15e7ce88-ea87-4b6d-a342-7a071297ff1a'], description: 'Lista de IDs dos conteúdos que a intent retornará na resposta.' })
	contents?: string[];

	@ApiProperty({ example: 1000, description: 'Nível de prioridade da intent.' })
	priority?: number;

	@ApiProperty({ example: true, description: 'Informa se a intent finalizará a interação com o usuário ou não.' })
	end_interaction?: boolean;

}
