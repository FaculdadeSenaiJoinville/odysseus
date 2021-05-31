export type MySQLError = {
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
    query: string;
    parameters: any[];
};
