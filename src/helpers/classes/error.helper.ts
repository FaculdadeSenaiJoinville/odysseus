import { BadRequestException, Injectable } from '@nestjs/common';
import { miscMessages } from 'src/messages';
import { MySQLError } from 'src/types/database';

@Injectable()
export class ErrorHelper {

	public throwInternalServerError = (): never => {

        throw new BadRequestException(miscMessages.send('internal_server_error'));
    }

    public throwMySQLError(error: MySQLError): never {

        throw new BadRequestException('MySQL Error');
    }

    public throwMongoError(error: MySQLError): never {

        throw new BadRequestException('MongoDB Error');
    }

    private getKeyFromErrorMessage(message: string, parameters: any[]): string {

        let key = '<missing_key>';

        for (const item of parameters) {
            if (message.includes(item)) {
                key = item;
            }
        }

        return key;
    }

}
