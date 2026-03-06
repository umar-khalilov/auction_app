'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('characters', table => {
        table.integer('id').notNullable().unsigned().primary().comment('The id of the character');
        table
            .integer('location_id')
            .unsigned()
            .references('id')
            .inTable('locations')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .comment('The id of the location');
        table.string('name', 255).notNullable().comment('The name of the character');
        table.enum('status', ['Alive', 'Dead', 'unknown']).notNullable().comment('The status of the character');
        table.string('species', 255).notNullable().comment('The species of the character');
        table.string('type', 255).notNullable().comment('The type or subspecies of the character');
        table
            .enum('gender', ['Male', 'Female', 'Genderless', 'unknown'])
            .notNullable()
            .comment('The gender of the character');
        table
            .jsonb('origin')
            .notNullable()
            .defaultTo({ name: '', location_id: null })
            .comment('The origin name and location ID of the character');
        table.text('image_url').notNullable().comment("Link to the character's image");
        table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Created at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('characters');
};
