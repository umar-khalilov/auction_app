import { format, inspect } from 'node:util';

export class LoggerService {
    /**
     * @private
     * @type {string}
     */
    #name;
    /**
     * @private
     * @type {number}
     */
    #DATETIME_LENGTH;
    /**
     * @private
     * @type {Record<string, string>}
     */
    #COLOURS;

    /**
     * @param {string} name
     */
    constructor(name) {
        this.#name = name;
        this.#DATETIME_LENGTH = 19;
        this.#COLOURS = {
            info: '\x1b[32m',
            debug: '\x1b[1;33m',
            error: '\x1b[0;31m',
            system: '\x1b[1;34m',
            access: '\x1b[1;38m',
        };
    }

    /**
     * @param {string} name
     */
    set name(name) {
        this.#name = name;
    }

    /**
     * @param {string} type
     * @param {string} msg
     */
    #output(type = 'info', msg) {
        const now = new Date().toISOString();
        const date = now.substring(0, this.#DATETIME_LENGTH);
        const colour = this.#COLOURS[type];
        const line = `${date}\t[${this.#name}] ${msg}`;
        if (type === 'error') {
            console.error(`${colour}${line}\x1b[0m`);
        }
        if (type === 'debug') {
            console.debug(`${colour}${line}\x1b[0m`);
        }
        console.log(`${colour}${line}\x1b[0m`);
    }

    /**
     * @param {...any} args
     */
    log(...args) {
        const msg = format(...args);
        this.#output('info', msg);
    }

    /**
     * @param {...any} args
     */
    dir(...args) {
        const msg = inspect(...args);
        this.#output('info', msg);
    }

    /**
     * @param {...any} args
     */
    debug(...args) {
        const msg = format(...args);
        this.#output('debug', msg);
    }

    /**
     * @param {...any} args
     */
    error(...args) {
        const msg = format(...args).replace(/[\n\r]{2,}/g, '\n');
        this.#output('error', msg.replace(this.regexp, ''));
    }

    /**
     * @param {...any} args
     */
    system(...args) {
        const msg = format(...args);
        this.#output('system', msg);
    }

    /**
     * @param {...any} args
     */
    access(...args) {
        const msg = format(...args);
        this.#output('access', msg);
    }
}
