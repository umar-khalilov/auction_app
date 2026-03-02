import { AlreadyExistException } from '@common/exceptions/AlreadyExistException';
import { BadRequestException } from '@common/exceptions/BadRequestException';

export class AuthService {
    /**
     * @public
     * @param {Record<string, string>} params
     * @returns {Promise<User>}
     */
    async signUp(params) {
        const {
            userAgent,
            name,
            surname,
            birthday,
            gender,
            login,
            email,
            password,
        } = params;
        const candidate = await User.where({ email }).fetch({ require: false });
        if (candidate) {
            throw new AlreadyExistException('User already exist');
        }
        const user = await new User({
            name,
            surname,
            birthday,
            gender,
            login,
            email,
            password_hash: password,
        }).save();
        const {
            attributes: { id },
        } = user;
        await new Role_User({ role_id: 2, user_id: id }).save();
        return user;
    }

    /**
     * @public
     * @param {Record<string, string>} params
     * @returns {Promise<string>}
     */
    async signIn({ email, password } = {}) {
        const user = await User.where({ email }).fetch({
            require: false,
            withRelated: ['roles'],
        });
        if (!user) {
            throw new Error(`User with this ${email} not found`);
        }
        const {
            attributes: { password_hash, id },
        } = user;
        const validPassword = await bcrypt.compare(password, password_hash);
        if (!validPassword) {
            throw new BadRequestException('Invalid credentials');
        }
        const [{ role }] = user.related('roles').toJSON();
        return await generateAccessToken(id, role);
    }
}
