import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MySQLRepositoryModule } from '../../../core/repository';
import { DialogflowModule } from '../dialogflow/dialogflow.module';
import { BotHistoryController } from './history.controller';
import { BotHistoryService } from './history.service';
import { BotHistoryRepository } from './utils/bot-history.repository';

dotenv.config();

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule
	],
	controllers: [
		BotHistoryController
	],
	providers: [
		BotHistoryService,
		BotHistoryRepository
	],
	exports: [
		BotHistoryService
	]
})
export class BotHistoryModule {}
