'use strict';
const faker = require('faker');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const generateChat = key => ({
            user_id: getRandomIntInclusive(1, 50),
            text: faker.lorem.sentence(),
            created_at: faker.date.recent(),
            updated_at: faker.date.recent(),
        });

        const generateChats = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateChat(i + 1));
        };
        await knex('chats').insert(generateChats(100));
    } catch (err) {
        console.error(err);
    }
};
