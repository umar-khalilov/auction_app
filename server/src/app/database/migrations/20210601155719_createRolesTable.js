'use strict';

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('roles', function(table) {
        table.increments('id').primary();
        table
            .string('role')
            .notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('roles');
};
