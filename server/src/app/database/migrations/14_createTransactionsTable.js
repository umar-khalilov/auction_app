'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('transactions', table => {
        table.increments('id').unsigned().primary().comment('Transaction ID');
        table
            .integer('buyer_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('buyers')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('Buyer ID');
        table.decimal('amount', 10, 2).notNullable().comment('Amount of transaction');
        table.enum('payment_method', ['card', 'cash']).notNullable().comment('Payment method');
        table.enum('status', ['pending', 'completed', 'failed']).notNullable().comment('Status of transaction');
        table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Created at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('transactions');
};
