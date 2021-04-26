import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './others/user.repository';
import { UserService } from './user.service';
import { userProvider } from './others/users.provider';
import { DatabaseModule } from 'src/core/database/database.module';
import { BcryptHelper } from 'src/common/helpers';
import { ErrorModule } from 'src/core/error/error.module';

@Module({
	imports: [
		DatabaseModule,
		ErrorModule
	],
	controllers: [
		UserController
	],
	providers: [
		...userProvider,
		UserRepository,
		UserService,
		BcryptHelper
	],
	exports: [
		UserRepository,
		UserService
	]
})
export class UserModule {}
