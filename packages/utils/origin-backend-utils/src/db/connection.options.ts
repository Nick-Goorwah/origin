import { ConnectionOptions } from 'typeorm';
import { ClientConfig } from 'pg';

export const getDBConnectionOptions = (): ConnectionOptions | ClientConfig => {
    if (process.env.DATABASE_URL) {
        const url = new URL(process.env.DATABASE_URL);

        return {
            type: 'postgres',
            host: process.env.DB_HOST ?? 'kyanite-server.postgres.database.azure.com',
            port: Number(process.env.DB_PORT) ?? 5432,
            user: url.username,
            username: process.env.DB_USERNAME ?? 'lvcddedcrc',
            password: process.env.DB_PASSWORD ?? '3N8U0QL1L35L43JR$',
            database: process.env.DB_DATABASE ?? 'origin',
            ssl: Boolean(process.env.DB_SSL_OFF) ? false : { rejectUnauthorized: false }
        } as ConnectionOptions | ClientConfig;
    }

    return {
        type: 'postgres',
        host: process.env.DB_HOST ?? 'kyanite-server.postgres.database.azure.com',
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USERNAME ?? 'lvcddedcrc',
        password: process.env.DB_PASSWORD ?? '3N8U0QL1L35L43JR$',
        database: process.env.DB_DATABASE ?? 'origin'
    } as ConnectionOptions | ClientConfig;
};
