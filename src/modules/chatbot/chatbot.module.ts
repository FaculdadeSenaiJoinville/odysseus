
import { Module } from '@nestjs/common';
import { TelegramModule } from 'nestjs-telegram';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [
		TelegramModule.forRoot({ botKey: process.env.BOT_KEY })
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
