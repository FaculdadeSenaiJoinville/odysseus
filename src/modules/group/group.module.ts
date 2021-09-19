
import { Module } from '@nestjs/common';
import { MySQLRepositoryModule } from '../../core/repositories';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupHelper } from './utils/group.helper';

@Module({
	imports: [
		MySQLRepositoryModule
	],
	controllers: [
		GroupController
	],
	providers: [
		GroupService,
		GroupHelper
	],
	exports: [
		GroupService
	]
})
export class GroupModule {}
