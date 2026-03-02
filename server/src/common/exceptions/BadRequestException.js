import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request', errors = []) {
        super(message, HttpStatusCodes.BAD_REQUEST, errors);
    }
}
