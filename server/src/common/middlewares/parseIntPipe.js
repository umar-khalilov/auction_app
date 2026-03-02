'use strict';
import { BadRequestException } from '@common/exceptions/BadRequestException';

/**
 * @param {...string} numbers
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): Promise<void>}
 */
export const parseIntPipe = async (...numbers) => {
    return async (req, res, next) => {
        try {
            for (const number of numbers) {
                const parsedInt = parseInt(req.params[number], 10);
                if (isNaN(parsedInt)) {
                    throw new BadRequestException('Invalid params data');
                }
                req.params[number] = parsedInt;
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
