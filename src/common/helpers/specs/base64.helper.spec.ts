import { Base64Helper } from "..";

const base64Helper = new Base64Helper();

describe('Base64 Helper', () => {

	describe('Encode', () => {

		it('should receive a string and return it encoded', () => {
			
			const input = 'senha@teste';
			const expected = Buffer.from(input).toString('base64');

			expect(base64Helper.encode(input)).toEqual(expected);
		});
	});

	describe('Decode', () => {

		it('should receive a hashed string and return it decoded', () => {
			
			const input = Buffer.from('senha@teste').toString('base64');
			const expected = Buffer.from(input, 'base64').toString();

			expect(base64Helper.decode(input)).toEqual(expected);
		});
	});
});
