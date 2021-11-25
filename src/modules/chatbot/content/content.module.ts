
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MySQLRepositoryModule } from '../../../core/repository';
import { DialogflowModule } from '../dialogflow/dialogflow.module';
import { BotIntentRepository } from '../intent/utils/bot-intent.repository';
import { BotContentController } from './content.controller';
import { BotContentService } from './content.service';
import { BotContentRepository } from './utils/bot-content.repository';

dotenv.config();

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule
	],
	controllers: [
		BotContentController
	],
	providers: [
		BotContentService,
		BotContentRepository,
		BotIntentRepository
	],
	exports: [
		BotContentService
	]
})
export class BotContentModule {}
