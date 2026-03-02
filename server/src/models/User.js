const bookshelf = require('../utils/helpers');

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password_hash'],

    roles() {
        return this.belongsToMany('Role', 'roles_users', 'user_id', 'role_id');
    },

    refreshTokens() {
        return this.hasMany('RefreshToken', 'user_id');
    },

    transactions() {
        return this.hasMany('Transaction', 'user_id');
    },

    ratings() {
        return this.hasMany('Rating', 'user_id');
    },

    chats() {
        return this.hasMany('Chat', 'user_id');
    },

    auction_items() {
        return this.belongsTo('Auction_Item', 'user_id');
    },
});

module.exports = User;
