'use strict';
import z from 'zod';
import { BadRequestException } from '@common/exceptions/BadRequestException';

/**
 * @param {z.ZodSchema} schema
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): Promise<void>}
 */
export const validate = schema => {
    return async ({ body }, res, next) => {
        try {
            await schema.parse(body);
            return next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                throw new BadRequestException(err.message, err.issues);
            }
            next(err);
        }
    };
};
