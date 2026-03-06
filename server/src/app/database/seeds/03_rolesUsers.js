'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export const seed = async knex => {
    try {
        let user = await knex('users').where('id', 1).first('id');
        let roleAdmin = await knex('roles').where('role', 'admin').first('id');
        await knex('roles_users').insert({ user_id: user.id, role_id: roleAdmin.id });
    } catch (err) {
        console.error(err);
    }
};
