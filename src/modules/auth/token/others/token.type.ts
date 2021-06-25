import { UserType } from 'src/modules/user/enums/user.types';

export type TokenPayload = {
    id: string;
    name: string;
    email: string;
    active: boolean,
    created_at: Date,
    type: UserType;
};
