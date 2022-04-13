import { Module } from '@nestjs/common';
import { TrailsController } from './trails.controller';
import { TrailsService } from './trails.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/errors.module';
import { MySQLRepositoryModule } from 'src/core/repository';
import { TrailsPolicies } from './utils/trails.policies';
import { TrailsRepository } from './utils/trails.repository';
import { GroupHelper } from '../group/utils/group.helper';
import { GroupPolicies } from '../group/utils/group.policies';

@Module({
	imports: [
		MySQLRepositoryModule,
		ErrorModule
	],
	controllers: [
		TrailsController
	],
	providers: [
		TrailsService,
		TrailsPolicies,
		TrailsRepository,
		GroupHelper,
		GroupPolicies,
		BcryptHelper
	],
	exports: [
		TrailsService
	]
})
export class TrailsModule {}
