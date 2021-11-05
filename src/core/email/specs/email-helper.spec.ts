
import * as EmailTemplate from 'email-templates';
import { EmailHelper } from '../utils/email.helper';

const emailHelper = new EmailHelper;

describe('EmailHelper', () => {

	describe('GetTransporterConfig', () => {

		it('should call function and return an instance of EmailTemplate', () => {

			const transporter = emailHelper.getTransporterConfig();

			expect(transporter).toBeInstanceOf(EmailTemplate);
		});
	});
});
