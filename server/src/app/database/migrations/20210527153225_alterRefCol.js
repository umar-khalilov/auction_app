exports.up = async function(knex, Promise) {
    return await knex.schema.alterTable('bids', function(table) {
        table
            .integer('auction_item_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('auction_items')
            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('bids');
};
