import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/error.module';
import { RepositoryModule } from 'src/core/repository/repository.module';

@Module({
	imports: [
		RepositoryModule,
		BcryptHelper,
		ErrorModule
	],
	controllers: [
		UserController
	],
	providers: [
		UserService,
		BcryptHelper
	],
	exports: [
		UserService
	]
})
export class UserModule {}
