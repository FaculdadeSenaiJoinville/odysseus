
import { Injectable } from '@nestjs/common';
import { TelegramService, TelegramUser } from 'nestjs-telegram';
import { Observable } from 'rxjs';

@Injectable()
export class ChatbotService {

	constructor(private readonly telegram: TelegramService) {}

	testBot(): Observable<TelegramUser> {
		
		return this.telegram.getMe();
	}

}