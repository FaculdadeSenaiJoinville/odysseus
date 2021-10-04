import { UserType } from 'src/modules/user/utils/users.type';

export type TokenPayload = {
    id: string;
    name: string;
    email: string;
    active: boolean,
    created_at: Date,
    type: UserType;
};
