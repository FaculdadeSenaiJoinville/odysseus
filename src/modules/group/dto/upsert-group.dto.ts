import { ApiProperty } from '@nestjs/swagger';

export class UpsertGroupDTO {

	@ApiProperty({ example: 'Turma ADS 2019', description: 'Nome do grupo.' })
	name: string;

	@ApiProperty({ example: 'Turma de ADS do primeiro semestre de 2019', description: 'Descrição do grupo.' })
	description?: string;

	@ApiProperty({ example: ['6803f79e-ccb9-45fb-9aca-0135bf86a485', '5903f79o-ggb9-78cd-9aki-0135bf86b328'], description: 'Lista com IDs dos membros do grupo.' })
	members?: string[];

	@ApiProperty({ example: ['6803f79e-ccb9-45fb-9aca-0135bf86a485', '5903f79o-ggb9-78cd-9aki-0135bf86b328'], description: 'Lista com IDs dos membros que serão removidos do grupo.' })
	members_to_remove?: string[];

}
