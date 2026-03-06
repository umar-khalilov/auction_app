'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('locations', table => {
        table.integer('id').notNullable().unsigned().primary().comment('The id of the location');
        table.string('name', 255).notNullable().comment('The name of the location');
        table.string('type', 255).notNullable().comment('The type of the location');
        table.string('dimension', 255).notNullable().comment('The dimension in which the location is located');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).comment('Created at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('locations');
};
