import 'express-async-errors';
import config from '@/config/config';
import { AppDataSource } from '@/data-source';
import { errorHandler } from '@/middlewares/errorHandler';
import routes from '@/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(
            cors({
                origin: config.app.baseUrl,
                credentials: true,
            }),
        );
        app.use(cookieParser());

        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: config.app.baseUrl,
                credentials: true,
            },
        });

        routes(app);

        app.use(errorHandler);

        server.listen(config.app.port, () => {
            console.log('Server running on port ' + config.app.port);
        });
    })
    .catch((error) => console.log(error));
