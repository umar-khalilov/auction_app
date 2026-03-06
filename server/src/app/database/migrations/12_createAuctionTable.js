'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('auctions', table => {
        table.increments('id').unsigned().primary().comment('Auction ID');
        table
            .integer('item_id')
            .unsigned()
            .references('id')
            .inTable('items')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Item ID');
        table
            .integer('buyer_id')
            .unsigned()
            .references('id')
            .inTable('buyers')
            .nullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Buyer ID');
        table.string('description').notNullable().comment('Description of the auction');
        table.dateTime('start_time').notNullable().comment('Start time of the auction');
        table.dateTime('end_time').notNullable().comment('End time of the auction');
        table.enum('status', ['active', 'inactive', 'completed']).notNullable().comment('Status of the auction');
        table.decimal('starting_price', 10, 2).notNullable().comment('Starting price of the auction');
        table.decimal('reserve_price', 10, 2).notNullable().comment('Reserve price of the auction');
        table.enum('currency', ['USD', 'EUR', 'GBP', 'UAH']).notNullable().comment('Currency of the auction');
        table.timestamps(true, true);
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('auctions');
};
