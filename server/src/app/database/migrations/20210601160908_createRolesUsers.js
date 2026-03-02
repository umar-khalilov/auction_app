'use strict';
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('roles_users', function(table) {
        table
            .integer('role_id')
            .unsigned()
            .nullable();
        table
            .foreign('role_id')
            .references('roles.id')
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table
            .integer('user_id')
            .unsigned()
            .nullable();
        table
            .foreign('user_id')
            .references('users.id')
            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('roles_users');
};
