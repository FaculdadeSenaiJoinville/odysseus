
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MySQLRepositoryModule } from '../../../core/repository';
import { DialogflowModule } from '../dialogflow/dialogflow.module';
import { BotIntentController } from './intent.controller';
import { BotIntentService } from './intent.service';
import { BotIntentRepository } from './utils/bot-intent.repository';

dotenv.config();

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule
	],
	controllers: [
		BotIntentController
	],
	providers: [
		BotIntentService,
		BotIntentRepository
	],
	exports: [
		BotIntentService
	]
})
export class BotIntentModule {}
