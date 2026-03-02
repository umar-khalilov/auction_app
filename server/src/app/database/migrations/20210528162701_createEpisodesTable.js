'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('episodes', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.date('air_date').defaultTo(knex.fn.now());
        table.string('episode').notNullable();
        table
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('episodes');
};
