'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('chats', function(table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.string('text').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('chats');
};
