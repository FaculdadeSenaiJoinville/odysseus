import { Injectable } from '@nestjs/common';
import { EmailTransporter, SendEmailConfig, SentEmailInfo } from './utils/email.type';
import { EmailOptions } from 'email-templates';
import { EmailHelper } from './utils/email.helper';

@Injectable()
export class EmailService {

	constructor(private readonly emailHelper: EmailHelper) {}

	public sendEmail(email_config?: SendEmailConfig): Promise<SentEmailInfo> {

		const { to, cc, template, locals } = email_config;
		const emailTransporter = this.emailHelper.getTransporterConfig() as EmailTransporter;
		const emailOptions: EmailOptions = {
			template,
			message: {
				to: to.join(',')
			}
		};

		if (locals) {

			emailOptions.locals = locals;
		}

		if (cc) {

			emailOptions.message.cc = cc.join(',');
		}

		return emailTransporter.send(emailOptions);
	}

}
