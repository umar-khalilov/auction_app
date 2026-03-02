'use strict';
exports.up = async function(knex, Promise) {
    return knex.schema.createTable('cards_episodes', function(table) {
        table
            .integer('card_id')
            .unsigned()
            .nullable();
        table
            .foreign('card_id')
            .references('cards.id')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table
            .integer('episode_id')
            .unsigned()
            .nullable();
        table
            .foreign('episode_id')
            .references('episodes.id')
            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('cards_episodes');
};
