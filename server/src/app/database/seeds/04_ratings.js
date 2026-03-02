'use strict';
const faker = require('faker');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const generateRating = key => ({
            user_id: getRandomIntInclusive(1, 50),
            point: getRandomIntInclusive(1, 10),
            updated_at: faker.date.recent(),
        });

        const generateRatings = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateRating(i + 1));
        };

        await knex('ratings').insert(generateRatings(10));
    } catch (err) {
        console.error(err);
    }
};
