export type MySQLError = {
    errno: number;
    sqlMessage: string;
    stack: string;
    message: string;
};
