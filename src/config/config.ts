import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        port: Number(process.env.PORT) || 8080,
        baseUrl: process.env.BASE_URL,
    },
    mysql: {
        mysqlHost: process.env.APP_DB_HOST,
        mysqlPort: Number(process.env.APP_DB_PORT) || 3306,
        mysqlUsername: process.env.APP_DB_USERNAME,
        mysqlPassword: process.env.APP_DB_PASSWORD,
        mysqlDatabase: process.env.APP_DB_DATABASE,
    },
    authentication: {
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
        jwtAccessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    },
    nodeEnv: process.env.NODE_ENV,
};

export default config;
