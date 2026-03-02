import { NotFoundException } from '@common/exceptions/NotFoundException';
import User from '@models/User';

export class UserService {
    /**
     * @public
     * @param {object} query
     * @returns {Promise<User[]>}
     */
    async findAll({ query }) {
        const users = await User.fetchAll({
            ...query,
        });
        if (!users) {
            throw new NotFoundException('Users not found');
        }
        return users;
    }

    /**
     * @public
     * @param {number} id
     * @returns {Promise<User>}
     */
    async findById(id) {
        const user = await User.forge({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    /**
     * @public
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    async removeById(id) {
        const count = await User({ id }).destroy({ require: true });
        if (count === 0) {
            throw new NotFoundException('User not found');
        }
        return true;
    }
}
