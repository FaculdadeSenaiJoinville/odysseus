import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import { Injectable } from '@nestjs/common';
import { SMTP_CONFIG } from './utils/email.config';
import { EmailConfig } from './utils/email.type';
import { EmailOptions } from 'email-templates';

@Injectable()
export class EmailService {

	public sendEmail(email_config: EmailConfig): Promise<any> {

		const { to, template, locals } = email_config;
		const emailTransporter = this.getEmailTransporter();
		const emailOptions: EmailOptions = {
			template,
			locals,
			message: {
				to: to.join(',')
			}
		};

		return emailTransporter.send(emailOptions);
	}

	private getEmailTransporter(): EmailTemplate<any> {

		const { host, user, pass, from } = SMTP_CONFIG;
		const transport = nodemailer.createTransport({
			host,
			auth: {
				user,
				pass
			}
		});

		return new EmailTemplate({
			message: {
				from: `Odyssey <${from}>`
			},
			views: {
				root: 'src/core/email/templates'
			},
			transport,
			send: true,
			preview: false
		});
	}

}
