import { ApplicationException } from '@common/exceptions/ApplicationException';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class RightsException extends ApplicationException {
    constructor(message = 'Not enough rights') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
}
