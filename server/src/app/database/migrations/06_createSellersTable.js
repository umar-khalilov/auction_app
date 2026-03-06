'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('sellers', table => {
        table.increments('id').unsigned().primary().comment('Seller ID');
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('User ID');
        table.decimal('rating', 3, 2).notNullable().defaultTo(0.0).comment('Rating of the seller');
        table.integer('total_sales').notNullable().defaultTo(0).comment('Total number of sales');
        table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Created at');
        table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Updated at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('buyers');
};
