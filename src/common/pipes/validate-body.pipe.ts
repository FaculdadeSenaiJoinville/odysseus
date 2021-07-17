import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiMessages } from 'odyssey-dictionary';
import { JoiDetail } from 'odyssey-dictionary/dist/types/joi.type';

type ValidationSchema = {
	module: string,
	keys: Joi.ObjectSchema<any>
};

@Injectable()
export class ValidateBodyPipe implements PipeTransform {

	constructor(private readonly validationSchema: ValidationSchema) {}

	public async transform(body: any) {

		const { error }  = Joi.compile(this.validationSchema.keys).validate(body);

		if (error) {

			throw new BadRequestException(error.details.map(detail => JoiMessages.translate(this.validationSchema.module, detail as JoiDetail)).join('; '));
		}

		return true;
	}

}
