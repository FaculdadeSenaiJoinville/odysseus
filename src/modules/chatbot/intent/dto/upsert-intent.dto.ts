import { ApiProperty } from '@nestjs/swagger';
import { BotContent } from '../../../../core/database/entities';

const contentsExample = [
	{
		id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
		name: 'Conteúdo de teste 1'
	},
	{
		id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9',
		name: 'Conteúdo de teste 2'
	}
];

export class UpsertIntentDTO {

	@ApiProperty({ example: 'Boas Vindas', description: 'Nome da intent.' })
	name: string;

	@ApiProperty({ example: ['Olá', 'Oi', 'Eae!'], description: 'Lista de frases de treinamento.' })
	training_phrases: string[];

	@ApiProperty({ example: 'Olá, seja bem vindo!', description: 'Resposta simples da intent.' })
	message?: string;

	@ApiProperty({ example: contentsExample, description: 'Lista de IDs dos conteúdos que a intent retornará na resposta.' })
	contents?: BotContent[];

	@ApiProperty({ example: contentsExample, description: 'Lista de IDs dos conteúdos que a intent retornará na resposta.' })
	contents_to_remove?: BotContent[];

	@ApiProperty({ example: 1000, description: 'Nível de prioridade da intent.' })
	priority?: number;

	@ApiProperty({ example: true, description: 'Informa se a intent finalizará a interação com o usuário ou não.' })
	end_interaction?: boolean;

}
