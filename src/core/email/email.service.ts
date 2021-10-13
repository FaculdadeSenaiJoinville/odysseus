import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import { Injectable } from '@nestjs/common';
import { SMTP_CONFIG } from './utils/email.config';
import { EmailConfig } from './utils/email.type';
import { EmailOptions } from 'email-templates';

@Injectable()
export class EmailService {

	public async sendEmail(email_config: EmailConfig) {

		const { to, template, locals } = email_config;
		const emailTransporter = this.getEmailTransporter();
		const emailOptions: EmailOptions = {
			template,
			locals,
			message: { to }
		};

		return emailTransporter.send(emailOptions)
			.then(() => {

				console.log('deu boa');
			})
			.catch(error => {

				console.log(error);
			});
	}

	private getEmailTransporter() {

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
			transport,
			send: true,
			preview: false
		});
	}

}
