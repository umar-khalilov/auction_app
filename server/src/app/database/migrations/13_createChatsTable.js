'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('chats', table => {
        table.increments('id').unsigned().primary().comment('Chat ID');
        table
            .integer('buyer_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('buyers')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Buyer ID');
        table
            .integer('seller_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('sellers')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Seller ID');
        table.string('message', 500).notNullable().comment('Message');
        table.timestamps(true, true);
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('chats');
};
