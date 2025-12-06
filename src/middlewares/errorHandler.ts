import config from '@/config/config';
import { NextFunction, Request, Response } from 'express';

type ErrorType = {
    status?: number;
    message?: string;
    stack?: string;
};

export const errorHandler = (error: ErrorType, req: Request, res: Response, next: NextFunction) => {
    const responseError = {
        status: error.status || 500,
        message: error.message || 'INTERNAL_SERVER_ERROR',
        stack: error.stack,
    };
    console.log(responseError);

    if (config.nodeEnv !== 'development') delete responseError.stack;

    res.status(responseError.status).json(responseError);
};
