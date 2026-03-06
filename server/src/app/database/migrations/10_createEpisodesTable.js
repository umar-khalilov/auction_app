'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('episodes', table => {
        table.integer('id').notNullable().unsigned().primary().comment('The id of the episode');
        table.string('name', 255).notNullable().comment('The name of the episode');
        table.date('air_date').notNullable().comment('The air date of the episode');
        table.string('episode_code', 255).notNullable().comment('The code of the episode');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).comment('Created at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('episodes');
};
