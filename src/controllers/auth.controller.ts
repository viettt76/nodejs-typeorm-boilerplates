import config from '@/config/config';
import { authService } from '@/services/auth.service';
import { Request, Response } from 'express';

export const authController = {
    async signup(req: Request, res: Response) {
        const { username, password } = req.body;
        await authService.signup({ username, password });

        return res.status(200).json();
    },

    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const { accessToken, refreshToken } = await authService.login({ username, password });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: config.authentication.jwtAccessExpiresIn,
            path: '/',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: config.authentication.jwtRefreshExpiresIn,
            path: '/',
        });

        return res.status(200).json();
    },
};
