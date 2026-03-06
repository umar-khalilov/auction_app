'use strict';
import { HashService } from '@common/services/HashService';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export const seed = async knex => {
    try {
        await knex('users').insert({
            name: 'John',
            surname: 'Doe',
            email: 'doe12@gmail.com',
            phone: '+380971234567',
            gender: 'male',
            password_hash: await new HashService().hashPassword('password123)'),
            is_verified: true,
        });
    } catch (err) {
        console.error(err);
    }
};
