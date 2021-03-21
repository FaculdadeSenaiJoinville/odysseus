export type LoginInput = {
    email: string;
    password: string;
    expiresIn: number;
};

export type LoginOutput = {
    message: string;
    token: string;
};

export type LogoutOutput = {
    message: string;
};
