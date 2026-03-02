'use strict';
exports.seed = async function(knex) {
    try {
        await knex('roles').insert([
            { role: 'admin' },
            { role: 'user' },
        ]);
    } catch (err) {
        console.error(err);
    }

};
