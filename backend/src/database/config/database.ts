import { envs } from "../../lib";

type DbConnection = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    dbLogging: boolean;
}

const connection: DbConnection = {
    host: envs.SERVER,
    port: envs.POSTGRES_PORT,
    user: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    dbLogging: envs.NODE_ENV,
};

export default connection;