'use strict';

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name', 128).notNullable();
        table.string('sur_name', 128).notNullable();
        table.string('login', 30).notNullable();
        table
            .string('email', 50)
            .unique()
            .notNullable();
        table.text('password_hash').notNullable();
        table
            .date('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        table.date('last_visit_date').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('users');
};