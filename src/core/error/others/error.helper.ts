import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHelper {

	public getKeyFromErrorMessage(message: string, parameters: any[]): string {

		let key = '<missing_key>';

		for (const item of parameters) {

			if (message.includes(item)) {

				key = item;
			}
		}

		return key;
	}

}
