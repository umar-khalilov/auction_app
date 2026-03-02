'use strict';
const rickandmorty = require('rickmortyapi');

exports.seed = async function (knex) {
    try {
        const rickLocation = await rickandmorty.getLocation(
            Array.from({ length: 108 }, (v, i) => i + 1)
        );

        function insertAllLocation () {
            const generateLocation = [];
            let rick;
            for (let location of rickLocation) {
                rick = {
                    name: location.name,
                    type: location.type,
                    dimension: location.dimension,
                    residents: location.residents,
                    created_at: location.created,
                };
                generateLocation.push(rick);
            }
            return generateLocation;
        }

        await knex('locations').insert(insertAllLocation());
    } catch (err) {
        console.error(err);
    }
};
