import config from '@/config/config';
import { messages } from '@/constants/constants';
import { AppDataSource } from '@/data-source';
import { User } from '@/entity/User';
import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const authService = {
    async signup(data: { username: string; password: string }): Promise<void> {
        const { username, password } = data;

        const user = await userRepository.findOneBy({
            username,
        });

        if (user) throw new HttpError(409, messages.AUTHENTICATION.USERNAME_EXISTS);

        const hashPassword = bcrypt.hashSync(password, 10);

        await userRepository.save({
            username,
            password: hashPassword,
        });
    },

    async login(data: { username: string; password: string }): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const { username, password } = data;

        const user = await userRepository.findOneBy({
            username,
        });

        if (!user) throw new HttpError(400, messages.AUTHENTICATION.USERNAME_OR_PASSWORD_INCORRECT);

        const isPasswordMatch = bcrypt.compareSync(password, user.password);

        if (!isPasswordMatch) throw new HttpError(400, messages.AUTHENTICATION.USERNAME_OR_PASSWORD_INCORRECT);

        if (
            !config.authentication.jwtAccessSecret ||
            !config.authentication.jwtRefreshSecret ||
            !config.authentication.jwtAccessExpiresIn ||
            !config.authentication.jwtRefreshExpiresIn
        ) {
            throw new Error('Missing JWT secrets or jwt max age');
        }

        const payload = {
            id: user.id,
        };

        const accessToken = jwt.sign(payload, config.authentication.jwtAccessSecret);
        const refreshToken = jwt.sign(payload, config.authentication.jwtRefreshSecret);

        return { accessToken, refreshToken };
    },
};
