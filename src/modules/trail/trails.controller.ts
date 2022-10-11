import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { TRAIL_VALIDATION } from './utils/trails.validation';
import { Trail } from 'src/core/database/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { AdminProfessorProtection, ApiController, AuthProtection } from 'src/common/decorators';
import { CreateTrailDTO,UpdateAccessTrailDTO, UpdateTrailDTO } from './dtos';
import { ListOptions, SuccessSaveMessage } from '../../common/types';
import { TrailsPaginationPipe } from './utils/trails-pagination.pipe';
import { TrailsRepository } from './utils/trails.repository';
import { TrailsType } from './utils/trails.type';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { EntityTrailAccess } from 'src/core/database/entities/vo/entity-trail-access.entity';

@ApiController('trails')
export class TrailsController {

	constructor(
		private readonly trailService: TrailsService,
		private readonly trailsRepository: TrailsRepository
	) { }

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

	@Post('create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body(new ValidateBodyPipe(TRAIL_VALIDATION)) trail: CreateTrailDTO): Promise<SuccessSaveMessage> {
		
		return this.trailService.create(trail);
	}

	@Put('update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(TRAIL_VALIDATION)) trail: UpdateTrailDTO): Promise<SuccessSaveMessage> {
		
		return this.trailService.update(id, trail);
	}

	@Put('status/:status/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public updateStatus(@Param('status') status: TrailsType, @Param('id') id: string): Promise<SuccessSaveMessage> {

		return this.trailService.changeStatus(status, id);
	}
	
	@Put('access/update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public updateAccess(@Param('id') id: string, @Body() trailAccess: UpdateAccessTrailDTO): Promise<SuccessSaveMessage> {
		
		return this.trailService.updateAccess(id, trailAccess);
	}

}
