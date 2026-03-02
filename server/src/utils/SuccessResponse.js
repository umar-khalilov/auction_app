import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class SuccessResponse {
    /**
     * @param {Record<string, unknown>} data
     * @param {number} status
     */
    constructor(data = {}, status = HttpStatusCodes.OK) {
        this.data = data;
        this.status = status;
    }
}
