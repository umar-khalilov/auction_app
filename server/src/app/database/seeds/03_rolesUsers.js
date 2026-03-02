'use strict';

exports.seed = async function(knex) {
    try {
        let users = await knex
            .from('users')
            .pluck('id')
            .then(id => id);
        let roles = await knex
            .from('roles')
            .pluck('id')
            .then(id => id);

        const generateRoleUser = key => ({
            user_id: users[key],
            role_id: roles[1],
        });

        const generateRolesUsers = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateRoleUser(i + 1));
        };
        await knex('roles_users').insert(generateRolesUsers(77));
    } catch (err) {
        console.error(err);
    }
};
