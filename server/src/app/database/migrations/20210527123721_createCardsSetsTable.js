'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('cards_sets', function(table) {
        table
            .integer('card_id')
            .unsigned()
            .nullable();
        table
            .foreign('card_id')
            .references('id')
            .inTable('cards')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table
            .integer('set_id')
            .unsigned()
            .nullable();
        table
            .foreign('set_id')
            .references('id')
            .inTable('set_of_cards')

            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('cards_sets');
};
