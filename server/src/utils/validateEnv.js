import { styleText } from 'node:util';
import z from 'zod';

/**
 * @param {z.ZodSchema} schema
 */
export const validateEnv = schema => {
    try {
        schema.parse(process.env);
    } catch (error) {
        console.error(styleText('red', error));
        process.exit(1);
    }
};
