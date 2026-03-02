'use strict';

const dirname = import.meta.dirname;

export default {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'postgres',
            database: 'auction_db',
            charset: 'utf8',
            pool: {
                min: 1,
                max: 10,
                acquireTimeoutMillis: 30000,
                idleTimeoutMillis: 30000,
                reapIntervalMillis: 1000,
                afterCreate: (conn, done) => {
                    conn.query('SET timezone="UTC";', err => {
                        if (err) done(err, conn);
                        else done(null, conn);
                    });
                },
            },
        },
        migrations: {
            directory: dirname + '/src/db/migrations',
        },
        seeds: {
            directory: dirname + '/src/db/seeds',
        },
    },
    staging: {},
    production: {},
};
