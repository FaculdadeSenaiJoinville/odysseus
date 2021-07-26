import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/error.module';
import { MySQLRepositoryModule } from 'src/core/repositories';
import { UsersPolicies } from './others/users.policies';

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
		BcryptHelper
	],
	exports: [
		UsersService
	]
})
export class UsersModule {}
