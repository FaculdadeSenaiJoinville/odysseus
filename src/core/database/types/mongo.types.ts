import { ConnectionCli } from "./misc.types";

export type MongoConnection = {
    name: string;
    type: string;
    url: string;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean,
    entities: string[];
    migrations: string[];
    cli: ConnectionCli;
};