'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('locations', function(table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('type').notNullable();
        table.string('dimension').notNullable();
        table.specificType('residents', 'text ARRAY').notNullable();
        table
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('locations');
};
