import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as Yup from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {

	constructor(private yupSchema: Yup.ObjectSchema<any>) {}

	public async transform(body: any) {

        console.log(body);
        console.log(this.yupSchema);
        
		return this.yupSchema.validate(body).catch(response => {

            throw new BadRequestException(response.errors.join('; '))
        });
	}
}