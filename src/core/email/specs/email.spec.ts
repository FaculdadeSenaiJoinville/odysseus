import { EmailService } from '../email.service';
import { EmailHelper } from '../utils/email.helper';
import { EmailStubs } from './email.stubs';

const transporter = {
	send: jest.fn()
};
const emailHelper = {
	getTransporterConfig: jest.fn().mockReturnValue(transporter)
};
const emailService = new EmailService(emailHelper as EmailHelper);
const emailStubs = new EmailStubs();

describe('Email', () => {

	describe('SendEmail', () => {

		it('should receive an input and return sent email data', async () => {
			
			const input = emailStubs.getEmailConfigData();
			const expected = emailStubs.getEmailResponse();

			transporter.send.mockResolvedValue(expected);

			await expect(emailService.sendEmail(input)).resolves.toEqual(expected);
		});
	});
});
