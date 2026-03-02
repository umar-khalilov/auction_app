'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('refresh_tokens', function(table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('users.id')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.text('value').notNullable();
        table.string('ua').notNullable();
        table.string('fingerprint').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('refresh_tokens');
};
