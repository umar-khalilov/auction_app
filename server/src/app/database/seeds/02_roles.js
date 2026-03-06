'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export const seed = async knex => {
    try {
        await knex('roles').insert([{ role: 'admin' }, { role: 'user' }, { role: 'manager' }]);
    } catch (err) {
        console.error(err);
    }
};
