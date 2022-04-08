import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import { Injectable } from '@nestjs/common';
import { SMTP_CONFIG } from './email.config';

@Injectable()
export class EmailHelper {

	public getTransporterConfig(): EmailTemplate {

		const { host, port, user, pass, from } = SMTP_CONFIG;
		const transport = nodemailer.createTransport({
			host,
			port: Number(port),
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
