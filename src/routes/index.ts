import { Express } from 'express';
import authRouter from './auth.router';

export default function routes(app: Express) {
    app.use('/api/auth', authRouter);
}
