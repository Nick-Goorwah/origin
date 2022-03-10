import path from 'path';
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'kyanite-server.postgres.database.azure.com',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME ?? 'lvcddedcrc',
    password: process.env.DB_PASSWORD ?? '3N8U0QL1L35L43JR$',
    database: process.env.DB_DATABASE ?? 'origin',
    synchronize: process.env.MODE !== 'production',
    logging: ['info'],
    migrationsRun: process.env.MODE === 'production',
    logger: 'file',
    migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
    cli: {
        migrationsDir: 'src/migrations'
    }
};

export = ormConfig;
