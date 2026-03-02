'use strict';

const { getCharacter } = require('rickmortyapi');

exports.seed = async function(knex) {
    try {
        const cards = await getCharacter(Array.from({ length: 671 }, (v, i) => i + 1));

        // let episodeIds = cards.map(c => parseInt(/episode\/([\d]+)/.exec('https://rickandmortyapi.com/api/episode/1')[1]));

        const insertAllCardsEpisodesIds = () => {
            const cardEpisodeIds = [];
            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < cards[i].episode.length; j++) {
                    cardEpisodeIds.push({
                        card_id: cards[i].id,
                        episode_id: cards[i].episode[j].split('/')[5],
                    });
                }
            }
        };

        await knex.batchInsert('cards_episodes', insertAllCardsEpisodesIds());
    } catch (err) {
        console.error(err);
    }
};
