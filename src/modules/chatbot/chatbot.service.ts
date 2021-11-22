import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';
import { TELEGRAM_CONFIG } from './utils/telegram.config';
import { Dictionary } from 'odyssey-dictionary';
import { BotHistoryService } from './history/history.service';
import { UpsertHistoryDTO } from './history/dto/create-history.dto';

@Injectable()
export class ChatbotService implements OnModuleInit {

	constructor(
		private readonly dialogflowService: DialogflowService,
		private readonly botHistoryService: BotHistoryService
	) {}

	public onModuleInit() {

		this.telegramBot();
	}

	private telegramBot(): void{

		const bot = new TelegramBot(TELEGRAM_CONFIG.token, { polling: true });

		bot.on('message', async message => {

			const chatId = message.chat.id;
			const userName = `${message.chat.first_name} ${message.chat.last_name}`  
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

					await this.botHistoryService.create(
						{
							user_name: userName,
							user_message: response.user_message,
							bot_response: JSON.stringify(bot_response),
							chat_id: chatId
						} as UpsertHistoryDTO)
				})
				.catch(async (error) => {
		
					console.error(error);
		
					await bot.sendMessage(chatId, Dictionary.chatbot.getMessage('chatbot_failed'));
				});
		
			return true;
		});
	}

}
