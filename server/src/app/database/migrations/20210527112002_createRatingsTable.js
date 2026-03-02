'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('ratings', function(table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.decimal('point', 10, 2).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex) {
    return await knex.schema.dropTable('ratings');
};
