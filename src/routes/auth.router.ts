import { authController } from '@/controllers/auth.controller';
import validate from '@/middlewares/validate';
import { loginValidator, signupValidator } from '@/validators/auth.validator';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', validate(signupValidator), authController.signup);
authRouter.post('/login', validate(loginValidator), authController.login);

export default authRouter;
