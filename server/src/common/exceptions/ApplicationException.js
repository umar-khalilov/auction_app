import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class ApplicationException extends Error {
    /**
     * @type {string}
     */
    #message = 'Something went wrong. Please try again';
    /**
     * @type {number}
     */
    #status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    /**
     * @type {string[]}
     */
    #errors;

    /**
     * @param {string} message
     * @param {number} status
     */
    constructor(message, status, errors = []) {
        super(message || this.#message);
        this.name = this.constructor.name;
        this.#status = status;
        this.#errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
