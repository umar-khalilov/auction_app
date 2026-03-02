const bookshelf = require('../utils/helpers');

const Rating = bookshelf.model('Rating', {
    tableName: 'ratings',
    user() {
        return this.belongsTo('User', 'user_id');
    },
});

module.exports = Rating;
