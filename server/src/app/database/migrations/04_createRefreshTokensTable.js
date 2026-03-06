'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('refresh_tokens', table => {
        table.increments('id').unsigned().primary().comment('Refresh token ID');
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('RESTRICT')
            .onDelete('CASCADE')
            .comment('User ID');
        table.text('value').notNullable().comment('Refresh token hashed value');
        table.text('user_agent').notNullable().comment('User agent');
        table.integer('expires_in').notNullable().comment('Refresh token expires in');
        table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Created at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('refresh_tokens');
};
