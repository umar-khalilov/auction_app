'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('items', table => {
        table.increments('id').unsigned().primary().comment('Item ID');
        table
            .integer('seller_id')
            .unsigned()
            .references('id')
            .inTable('sellers')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Seller ID');
        table
            .integer('auction_id')
            .unsigned()
            .references('id')
            .inTable('auctions')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Auction ID');
        table
            .integer('card_id')
            .unsigned()
            .references('id')
            .inTable('cards')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Card ID');
        table.enum('status', ['available', 'sold', 'auctioned']).notNullable().comment('Item status');
        table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Created at');
        table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Updated at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.dropTable('cards');
};
