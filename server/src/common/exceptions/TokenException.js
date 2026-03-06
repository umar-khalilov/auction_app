import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class TokenException extends ApplicationException {
    constructor(message = 'Invalid token', status = HttpStatusCodes.BAD_REQUEST) {
        super(message, status);
    }
}
