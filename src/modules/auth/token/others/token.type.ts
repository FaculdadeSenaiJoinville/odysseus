import { UserType } from 'src/modules/user/others/user.type';

export type TokenPayload = {
    id: string;
    name: string;
    email: string;
    active: boolean,
    created_at: Date,
    type: UserType;
};
