'use strict';
const faker = require('faker');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const generateBid = key => ({
            user_id: getRandomIntInclusive(1, 50),
            amount: getRandomIntInclusive(100, 1000),
            created_at: faker.date.past(),
            auction_item_id: getRandomIntInclusive(21, 40),
        });
        const generateBids = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateBid(i + 1));
        };
        await knex('bids').insert(generateBids(20));
    } catch (err) {
        console.error(err);
    }
};
