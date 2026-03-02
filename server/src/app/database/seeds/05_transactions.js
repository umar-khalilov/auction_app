'use strict';
const faker = require('faker');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const generateTransaction = key => ({
            user_id: getRandomIntInclusive(1, 50),
            card_points: getRandomIntInclusive(1, 100),
            type: faker.finance.transactionType(),
            updated_at: faker.date.recent(),
        });

        const generateTransactions = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateTransaction(i + 1));
        };
        await knex('transactions').insert(generateTransactions(50));
    } catch (err) {
        console.error(err);
    }
};
