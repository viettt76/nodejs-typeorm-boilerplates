import config from '@/config/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.mysql.mysqlHost,
    port: config.mysql.mysqlPort,
    username: config.mysql.mysqlUsername,
    password: config.mysql.mysqlPassword,
    database: config.mysql.mysqlDatabase,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/entity/**/*{.js,.ts}'],
    migrations: [__dirname + '/migration/**/*{.js,.ts}'],
    subscribers: [],
});
