'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('roles', table => {
        table.increments('id').unsigned().primary().comment('Role ID');
        table.enum('role', ['admin', 'manager', 'user']).unique().notNullable().comment('Role name');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('roles');
};
