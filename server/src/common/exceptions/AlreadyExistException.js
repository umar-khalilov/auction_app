import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class AlreadyExistException extends ApplicationException {
    constructor(message = 'Already exist') {
        super(message, HttpStatusCodes.CONFLICT);
    }
}
