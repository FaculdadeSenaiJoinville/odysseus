import { ConnectionCli } from "./misc.types";

export type MySQLError = {
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
    query: string;
    parameters: any[];
};

export type MySQLConnection = {
    name: string;
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    cli: ConnectionCli;
};
