import Joi from 'joi';

export const signupValidator = Joi.object({
    body: {
        username: Joi.string().min(6).max(30).required().trim().strict(),
        password: Joi.string()
            .min(8)
            .max(32)
            .regex(/\w/)
            .regex(/[@$!%*?&]/)
            .required()
            .trim()
            .strict(),
    },
});

export const loginValidator = Joi.object({
    body: {
        username: Joi.string().required().trim().strict().pattern(/^\S+$/, 'no-whitespace').messages({
            'string.pattern.name': 'Tài khoản không được chứa ký tự trắng',
        }),
        password: Joi.string().required().trim().strict().pattern(/^\S+$/, 'no-whitespace').messages({
            'string.pattern.name': 'Mật khẩu không được chứa ký tự trắng',
        }),
    },
});
