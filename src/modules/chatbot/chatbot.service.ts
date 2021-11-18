import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';
import { TELEGRAM_CONFIG } from './utils/telegram.config';
import { Dictionary } from 'odyssey-dictionary';

@Injectable()
export class ChatbotService implements OnModuleInit {

	constructor(private readonly dialogflowService: DialogflowService) {}

	public onModuleInit() {

		this.telegramBot();
	}

	private telegramBot(): void{

		const bot = new TelegramBot(TELEGRAM_CONFIG.token, { polling: true });

		bot.on('message', async message => {

			const chatId = message.chat.id;
			const data = {
				session_id: String(chatId),
				message: message.text || ''
			};

			this.dialogflowService.sendMessage(data)
				.then(async (response) => {
		
					const { bot_response } = response;
					
					for (const message of bot_response) {
				
						await bot.sendMessage(chatId, message);
					}
				})
				.catch(async (error) => {
		
					console.error(error);
		
					await bot.sendMessage(chatId, Dictionary.chatbot.getMessage('chatbot_failed'));
				});
		
			return true;
		});
	}

}
