import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

const validate = <T>(schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

        const { error, value } = schema.validate({ body: req.body, params: req.params, query: req.query }, options);

        if (error) {
            return res.status(422).json({
                message: 'Validation error occurred',
                details: error.details.map((d) => d.message),
            });
        }

        req.body = value.body;
        req.params = value.params;
        req.query = value.query;

        next();
    };
};

export default validate;
