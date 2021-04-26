import { Injectable } from "@nestjs/common";

@Injectable()
export class Base64Helper {

	public encode(value: string) {

        return Buffer.from(value).toString('base64');
    }

    public decode(base64encoded: string) {

        return Buffer.from(base64encoded, 'base64').toString();
    }

}
