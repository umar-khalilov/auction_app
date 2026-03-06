'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('roles_users', table => {
        table.integer('role_id').unsigned().notNullable().comment('Role ID');
        table.foreign('role_id').references('id').inTable('roles').onUpdate('CASCADE').onDelete('SET NULL');
        table.integer('user_id').unsigned().notNullable().comment('User ID');
        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('roles_users');
};
