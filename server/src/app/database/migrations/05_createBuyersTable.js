'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('buyers', table => {
        table.increments('id').unsigned().primary().comment('Buyer ID');
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('User ID');
        table.text('bid_history').nullable().comment('History of bids made by the buyer');
        table.decimal('rating', 3, 2).notNullable().defaultTo(0.0).comment('Rating of the buyer');
        table.integer('total_bids').notNullable().defaultTo(0).comment('Total number of bids');
        table.timestamps(true, true);
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('buyers');
};
