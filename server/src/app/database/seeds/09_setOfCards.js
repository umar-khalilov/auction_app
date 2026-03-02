'use strict';
const faker = require('faker');

exports.seed = async function (knex) {
    try {
        const generateSet = key => ({
            name: faker.name.findName(),
            discount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        });
        const generateSets = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateSet(i + 1));
        };
        await knex('set_of_cards').insert(generateSets(20))
    } catch (err) {
        console.error(err);
    }
};
