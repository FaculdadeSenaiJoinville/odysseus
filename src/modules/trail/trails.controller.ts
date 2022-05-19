import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CREATE_TRAIL_VALIDATION, UPDATE_PASSWORD_VALIDATION, UPDATE_USER_VALIDATION } from './utils/trails.validation';
import { Trail } from 'src/core/database/entities';
import { User } from 'src/core/database/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { AdminProfessorProtection, ApiController, AuthProtection } from 'src/common/decorators';
import { CreateTrailDTO, UpdatePasswordDTO, UpdateTrailDTO } from './dtos';
import { ListOptions, SuccessSaveMessage } from '../../common/types';
import { TrailsPaginationPipe } from './utils/trails-pagination.pipe';
import { TrailsRepository } from './utils/trails.repository';

@ApiController('trails')
export class TrailsController {

	constructor(
		private readonly trailService: TrailsService,
		private readonly trailsRepository: TrailsRepository
	) {}

	@Get('list')
	@AuthProtection()
	@AdminProfessorProtection()
	public list(@Query(new TrailsPaginationPipe()) options: ListOptions<Trail>): Promise<[Trail[], number]> {

		return this.trailsRepository.list(options);
	}

	@Get('details/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public details(@Param('id') id: string): Promise<Trail> {

		return this.trailsRepository.details(id);
	}

	@Get('profile')
	@AuthProtection()
	public profile(): Promise<Trail> {

		return this.trailsRepository.profile();
	}

	@Post('create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body() trail: CreateTrailDTO): Promise<SuccessSaveMessage> {
		
		return this.trailService.create(trail);
	}

	@Put('update-password/:id')
	@AuthProtection()
	public updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		return this.trailService.updatePassword(id, password_payload);
	}
	
	@Put('update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body() trail: UpdateTrailDTO): Promise<SuccessSaveMessage> {

		return this.trailService.update(id, trail);
	}

}
