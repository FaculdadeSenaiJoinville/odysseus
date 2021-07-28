import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorsModule } from 'src/core/error/errors.module';
import { MySQLRepositoryModule } from 'src/core/repositories';
import { UsersPolicies } from './others/users.policies';
import { UsersRepository } from './others/users.repository';

@Module({
	imports: [
		MySQLRepositoryModule,
		ErrorsModule
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
