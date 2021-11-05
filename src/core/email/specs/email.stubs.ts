import { SendEmailConfig, SentEmailInfo } from '../utils/email.type';

export class EmailStubs {
	
	public getEmailConfigData(): SendEmailConfig {

		return {
			to: ['gabriel@gmail.com'],
			cc: ['nicolas@gmail.com', 'matheus@gmail.com'],
			template: 'welcome',
			locals: {
				name: 'Gabriel',
				password: 'Teste@123'
			}
		};
	}

	public getEmailResponse(): SentEmailInfo {

		return {
			accepted: [''],
			rejected: [''],
			envelopeTime: 100,
			messageTime: 1020,
			messageSize: 2000,
			response: '',
			envelope: {
				from: '',
				to: ['']
			},
			messageId: '',
			originalMessage: {
				to: '',
				cc: '',
				from: '',
				attachments: [],
				subject: '',
				html: '',
				text: ''
			}
		};
	}

}