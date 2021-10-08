
import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import * as dotenv from 'dotenv';
import { DialogflowModule } from './dialogflow/dialogflow.module';

dotenv.config();

@Module({
	imports: [
		DialogflowModule
	],
	controllers: [
		ChatbotController
	],
	providers: [
		ChatbotService
	],
	exports: [
		ChatbotService
	]
})
export class ChatbotModule {}
