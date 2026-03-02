'use strict';
const faker = require('faker');
module.exports.getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.getRandomAuctionStatus = () => {
    let auctionStatus;
    let random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (random === 1) {
        auctionStatus = 'cancelled';
    } else if (random === 2) {
        auctionStatus = 'finished';
    } else {
        auctionStatus = 'waiting for the start of trading';
    }
    return auctionStatus;
};



