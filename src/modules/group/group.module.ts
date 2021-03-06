
import { Module } from '@nestjs/common';
import { MySQLRepositoryModule } from 'src/core/repository';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupHelper } from './utils/group.helper';
import { GroupPolicies } from './utils/group.policies';
import { GroupRepository } from './utils/group.repository';

@Module({
	imports: [
		MySQLRepositoryModule
	],
	controllers: [
		GroupController
	],
	providers: [
		GroupService,
		GroupPolicies,
		GroupRepository,
		GroupHelper
	],
	exports: [
		GroupService
	]
})
export class GroupModule {}
