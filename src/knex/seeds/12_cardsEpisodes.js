'use strict';
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        let cards = await knex
            .distinct()
            .from('cards')
            .pluck('id')
            .then(id => {
                return id;
            });

        let episodes = await knex
            .distinct()
            .from('episodes')
            .pluck('id')
            .then(id => {
                return id;
            });

        const generateCardEpisode = key => ({
            card_id: cards[key],
            episode_id: episodes[key],
        });

        const generateCardsEpisodes = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateCardEpisode(i + 1));
        };
        await knex('cards_episodes').insert(generateCardsEpisodes(671));
    } catch (err) {
        console.error(err);
    }
};