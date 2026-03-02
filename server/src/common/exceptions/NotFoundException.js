import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class NotFoundException extends ApplicationException {
    constructor(message = 'Not found') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}
