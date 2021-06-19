import * as bcrypt from 'bcrypt';
import { BcryptHelper } from "..";
import { InternalServerErrorException } from "@nestjs/common";
import { Dictionary } from 'odyssey-dictionary';

const bcryptHelper = new BcryptHelper();

describe('Bcrypt Helper', () => {

	describe('Hash String', () => {

		it('should receive a string and return a hashed version of it', () => {
			
			const input = 'senha@teste';

			expect(bcryptHelper.hashString(input)).resolves;
		});

		it('should receive an object and throw error', async () => {
			
			const input = { senha: 'senha@teste' };
			const expected = new InternalServerErrorException(Dictionary.systemError.getMessage('internal_server_error'));

			await expect(bcryptHelper.hashString(input as any)).rejects.toEqual(expected);
		});
	});

	describe('Compare String To Hash', () => {

		it('should receive a string and a hashed string and compare both', async () => {
			
			const input = 'senha@teste';
			const expected = await bcrypt.hash(input, 10);

			await expect(bcryptHelper.compareStringToHash(input, expected)).resolves.toEqual(true);
		});

		it('should receive an object and a hashed string and throw error', async () => {
			
			const input = { senha: 'senha@teste'};
			const hashedString = await bcrypt.hash('teste@diferente', 10);
			const expected = new InternalServerErrorException(Dictionary.systemError.getMessage('internal_server_error'));

			await expect(bcryptHelper.compareStringToHash(input as any, hashedString)).rejects.toEqual(expected);
		});
	});
});
