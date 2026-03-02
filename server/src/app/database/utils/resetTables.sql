DELETE FROM knex_migrations
WHERE knex_migrations."name" IN (
        '20210601160908_createRolesUsers.js','20210601155719_createRolesTable.js'
    );
    
DROP TABLE if EXISTS users cascade;
TRUNCATE TABLE cards_episodes;
ALTER TABLE episodes DROP COLUMN cards;
TRUNCATE TABLE locations;
DROP TABLE locations;
DROP DATABASE auction_db;