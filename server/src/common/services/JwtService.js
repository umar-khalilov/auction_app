import { sign, verify, decode, TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
import { TokenException } from '@common/exceptions/TokenException';
import { configuration } from '@configs/envConfigs';

export class JwtService {
    /**
     * @type {string}
     */
    #accessJwtSecret;
    /**
     * @type {string}
     */
    #refreshJwtSecret;
    /**
     * @type {{algorithm: string; expiresIn: number}}
     */
    #accessJwtOptions;
    /**
     * @type {{algorithm: string; expiresIn: number}}
     */
    #refreshJwtOptions;

    constructor() {
        this.#accessJwtSecret = configuration.accessJWTSecret;
        this.#refreshJwtSecret = configuration.refreshJWTSecret;
        this.#accessJwtOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.accessJWTTime,
        };
        this.#refreshJwtOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.refreshJWTTime,
        };
    }

    /**
     * @param {string} token
     * @returns {Promise<{id: number; email: string; roles: string[]}>}
     */
    async getTokenPayload(token) {
        const { payload } = decode(token, { complete: true });
        return payload;
    }

    /**
     * @param {{id: string; email: string; roles: string[]}} payload
     * @returns {Promise<string>}
     */
    async genAccessToken(payload) {
        return new Promise((resolve, reject) => {
            sign(payload, this.#accessJwtSecret, this.#accessJwtOptions, (err, token) => {
                if (err) reject(new TokenException());
                resolve(token);
            });
        });
    }

    /**
     * @param {{id: string; email: string; roles: string[]}} payload
     * @returns {Promise<string>}
     */
    async genRefreshToken(payload) {
        return new Promise((resolve, reject) => {
            sign(payload, this.#refreshJwtSecret, this.#refreshJwtOptions, (err, token) => {
                if (err) reject(new TokenException());
                resolve(token);
            });
        });
    }

    /**
     * @param {string} token
     * @returns {Promise<{id: number; email: string; roles: string[]}>}
     */
    async verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            verify(token, this.#accessJwtSecret, this.#accessJwtOptions, (err, decodedData) => {
                if (err?.name === TokenExpiredError.name) {
                    reject(new TokenException(`token expired: ${err.expiredAt}`));
                }
                if (err?.name === JsonWebTokenError.name) {
                    reject(new TokenException('token malformed'));
                }
                if (err?.name === NotBeforeError.name) {
                    reject(new TokenException(`token not active: ${err.date}`));
                }
                resolve(decodedData);
            });
        });
    }

    /**
     * @param {string} token
     * @returns {Promise<{id: number; email: string; roles: string[]}>}
     */
    async verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            verify(token, this.#refreshJwtSecret, this.#refreshJwtOptions, (err, decodedData) => {
                if (err?.name === TokenExpiredError.name) {
                    reject(new TokenException(`token expired: ${err.expiredAt}`));
                }
                if (err?.name === JsonWebTokenError.name) {
                    reject(new TokenException('token malformed'));
                }
                if (err?.name === NotBeforeError.name) {
                    reject(new TokenException(`token not active: ${err.date}`));
                }
                resolve(decodedData);
            });
        });
    }

    /**
     * @param {{id: number; email: string; roles: string[]}} userData
     * @returns {Promise<string[]>}
     */
    async genTokens(userData) {
        const { id, email, roles } = userData;
        if (!id || !email || !roles.length) {
            throw new TokenException();
        }
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles.map(({ value }) => value),
        };
        return Promise.all([this.genAccessToken(payload), this.genRefreshToken(payload)]);
    }
}
