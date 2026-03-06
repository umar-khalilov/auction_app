'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export const seed = async knex => {
    try {
        let user = await knex('users').where('id', 1).first('id');
        let roles = await knex('roles').whereIn('role', ['admin', 'user']).select('id');
        await knex('roles_users').insert(roles.map(({ id }) => ({ user_id: user.id, role_id: id })));
    } catch (err) {
        console.error(err);
    }
};
