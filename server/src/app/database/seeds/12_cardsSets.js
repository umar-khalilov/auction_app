'use strict';
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function(knex) {
    try {
        let cards = await knex
            .from('cards')
            .pluck('id')
            .then(id => id);

        let set_of_cards = await knex
            .from('set_of_cards')
            .pluck('id')
            .then(id => id);

        const generateCardSet = key => ({
            card_id: cards[getRandomIntInclusive(1,671)],
            set_id: set_of_cards[getRandomIntInclusive(1,20)],
        });

        const generateCardsSets = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateCardSet(i + 1));
        };
        await knex('cards_sets').insert(generateCardsSets(700));
    } catch (err) {
        console.error(err);
    }
};
