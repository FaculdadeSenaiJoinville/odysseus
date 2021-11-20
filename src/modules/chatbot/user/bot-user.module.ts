
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MySQLRepositoryModule } from '../../../core/repository';
import { DialogflowModule } from '../dialogflow/dialogflow.module';
import { BotUserController } from './bot-user.controller';
import { BotUserService } from './bot-user.service';
import { BotUserRepository } from './utils/bot-user.repository';

dotenv.config();

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule
	],
	controllers: [
		BotUserController
	],
	providers: [
		BotUserService,
		BotUserRepository
	],
	exports: [
		BotUserService
	]
})
export class BotUserModule {}
