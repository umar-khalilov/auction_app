'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('transactions', function(table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.decimal('card_points', 10, 2).notNullable();
        table.string('type').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('transactions');
};
