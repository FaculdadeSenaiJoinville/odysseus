import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/errors.module';
import { MySQLRepositoryModule } from 'src/core/repository';
import { UsersPolicies } from './utils/users.policies';
import { UsersRepository } from './utils/users.repository';
import { GroupHelper } from '../group/utils/group.helper';
import { GroupPolicies } from '../group/utils/group.policies';
import { EmailModule } from '../../core/email/email.module';

@Module({
	imports: [
		EmailModule,
		MySQLRepositoryModule,
		ErrorModule
	],
	controllers: [
		UsersController
	],
	providers: [
		UsersService,
		UsersPolicies,
		UsersRepository,
		GroupHelper,
		GroupPolicies,
		BcryptHelper
	],
	exports: [
		UsersService
	]
})
export class UsersModule {}
