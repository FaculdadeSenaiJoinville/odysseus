import { BadRequestException, Injectable } from "@nestjs/common";
import * as Yup from 'yup';

@Injectable()
export class YupHelper {

    public async validate(yup: Yup.ObjectSchema<any>, data: Object) {

        await yup.validate(data).catch(response => {

			throw new BadRequestException(response.errors.join('; '))
		});
    }

}
