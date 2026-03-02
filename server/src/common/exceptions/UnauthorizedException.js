import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class UnauthorizedException extends ApplicationException {
    constructor(message = 'Wrong email or password') {
        super(message, HttpStatusCodes.UNAUTHORIZED);
    }
}
