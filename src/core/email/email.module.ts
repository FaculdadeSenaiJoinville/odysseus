import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailHelper } from './utils/email.helper';

@Module({
	providers: [
		EmailService,
		EmailHelper
	],
	exports: [
		EmailService
	]
})
export class EmailModule {}
