'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('characters_episodes', table => {
        table.integer('character_id').unsigned().notNullable().comment('Character ID');
        table.foreign('character_id').references('id').inTable('characters').onUpdate('CASCADE').onDelete('SET NULL');
        table.integer('episode_id').unsigned().notNullable().comment('Episode ID');
        table.foreign('episode_id').references('id').inTable('episodes').onUpdate('CASCADE').onDelete('SET NULL');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('characters_episodes');
};
