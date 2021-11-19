import * as dotenv from 'dotenv';

dotenv.config();

export const TELEGRAM_CONFIG = {
	token: process.env.BOT_TELEGRAM_TOKEN
};
