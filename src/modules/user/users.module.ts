import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/errors.module';
import { MySQLRepositoryModule } from 'src/core/repository';
import { UsersPolicies } from './utils/users.policies';
import { UsersRepository } from './utils/users.repository';

@Module({
	imports: [
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
		BcryptHelper
	],
	exports: [
		UsersService
	]
})
export class UsersModule {}
