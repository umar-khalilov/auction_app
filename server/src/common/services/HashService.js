import { Algorithm, Version, hash, verify } from '@node-rs/argon2'

export class HashService {
    /**
     * @type {import("@node-rs/argon2").Options}
     */
    #options

    constructor() {
        this.#options = {
            memoryCost: 4096,
            timeCost: 4,
            outputLen: 32,
            parallelism: 4,
            algorithm: Algorithm.Argon2id,
            version: Version.V0x13,
        }
    }

    /**
     * @param {string} password
     * @returns {Promise<string>}
     */
    async hashPassword(password) {
        return hash(password, this.#options)
    }

    /**
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    async verifyPassword(password, hash) {
        return verify(hash, password)
    }
}
