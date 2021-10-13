import * as dotenv from 'dotenv';

dotenv.config();

export const SMTP_CONFIG = {
	service: process.env.SMTP_SERVICE,
	host: process.env.SMTP_HOST,
	user: process.env.SMTP_USER,
	pass: process.env.SMTP_PASSWORD,
	from: process.env.SMTP_FROM
};
