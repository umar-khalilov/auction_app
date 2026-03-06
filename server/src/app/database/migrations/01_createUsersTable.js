'use strict';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async knex => {
    return knex.schema.withSchema('public').createTable('users', table => {
        table.increments('id').unsigned().primary().comment('User ID');
        table.string('name', 255).notNullable().comment('User name');
        table.string('surname', 255).notNullable().comment('User surname');
        table.string('email', 255).unique().notNullable().comment('User email');
        table.string('phone', 255).unique().notNullable().comment('User phone');
        table.string('avatar', 500).nullable().comment('User avatar');
        table.date('birth_date').nullable().comment('User birth date');
        table.enum('gender', ['male', 'female', 'other']).nullable().comment('User gender');
        table.text('password_hash').notNullable().comment('User password hash');
        table.boolean('is_verified').defaultTo(false).comment('User is verified');
        table.boolean('is_deleted').defaultTo(false).comment('User is deleted');
        table.dateTime('last_visit_date').nullable().comment('User last visit date');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).comment('Created at');
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()).comment('Updated at');
    });
};

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async knex => {
    return knex.schema.withSchema('public').dropTable('users');
};
