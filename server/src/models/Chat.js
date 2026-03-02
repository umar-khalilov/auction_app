const bookshelf = require('../utils/helpers');

const Chat = bookshelf.model('Chat', {
    tableName: 'chats',
    user() {
        return this.belongsTo('User', 'user_id');
    },
});

module.exports = Chat;
