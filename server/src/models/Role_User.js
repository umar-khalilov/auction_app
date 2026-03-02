const bookshelf = require('../utils/helpers');

const Role_User = bookshelf.model('Role_User', {
    tableName: 'roles_users',
});

module.exports = Role_User;
