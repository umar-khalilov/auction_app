const faker = require('faker');
const { getRandomIntInclusive, getRandomAuctionStatus } = require('../utils');

exports.seed = async function(knex) {
    try {
        const time = {
            max_dur_auction: `${getRandomIntInclusive(1, 3)}:${0}:${0}`,
            min_auction_time: `${0}:${getRandomIntInclusive(10, 20)}:${0}`,
        };

        const generateAuctionItem = key => ({
            user_id: getRandomIntInclusive(1, 50),
            card_id: getRandomIntInclusive(1, 671),
            bid_won_id: getRandomIntInclusive(141, 160),
            description: faker.lorem.words(),
            start_date: faker.date.future(),
            auction_status: getRandomAuctionStatus(),
            actual_price: faker.finance.amount(),
            initial_rate: faker.finance.amount(100, 200),
            maximum_rate: faker.finance.amount(500, 1000),
            bet_step: faker.commerce.price(50, 100),
            max_dur_auction: time.max_dur_auction,
            min_auction_time: time.min_auction_time,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        });
        const generateAuctionItems = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateAuctionItem(i + 1));
        };
        await knex('auction_items').insert(generateAuctionItems(20));
    } catch (err) {
        console.error(err);
    }
};
