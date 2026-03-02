'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('set_of_cards', function(table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('discount').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('set_of_cards');
};
