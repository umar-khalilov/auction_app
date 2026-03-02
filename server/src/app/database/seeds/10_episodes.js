'use strict';
const rickandmorty = require('rickmortyapi');

exports.seed = async function (knex) {
    try {
        const rickEpisodes = await rickandmorty.getEpisode(
            Array.from({ length: 41 }, (v, i) => i + 1)
        );

        const insertAllEpisodes = () => {
            const addEpisodes = [];
            let episode;
            for (let instanceEpisode of rickEpisodes) {
                episode = {
                    name: instanceEpisode.name,
                    air_date: instanceEpisode.air_date,
                    episode: instanceEpisode.episode,
                    cards: instanceEpisode.characters,
                    created_at: instanceEpisode.created,
                };
                addEpisodes.push(episode);
            }
            return addEpisodes;
        };

        await knex('episodes').insert(insertAllEpisodes());
    } catch (err) {
        console.error(err);
    }
};
