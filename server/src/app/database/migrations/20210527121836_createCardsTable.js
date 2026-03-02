'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('cards', function(table) {
        table.increments('id').primary();
        table
            .integer('location_id')
            .unsigned()
            .references('locations.id')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.string('name', 100).notNullable();
        table.string('status').notNullable();
        table.string('species').notNullable();
        table.string('type_of_person').notNullable();
        table.string('gender');
        table
            .boolean('is_active')
            .defaultTo(false)
            .notNullable();
        table.text('image_path').notNullable();
        table.text('origin').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('cards');
};
