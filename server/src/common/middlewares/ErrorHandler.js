import { ApplicationException } from '@common/exceptions/ApplicationException';
import { LoggerService } from '@common/services/LoggerService';
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export class ErrorHandler {
    static #logger = new LoggerService(ErrorHandler.name);

    /**
     * @param {Error} err
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    static async errorHandler(err, req, res, next) {
        ErrorHandler.#logger.error(`CAUGHT:==> ${err.cause}`);
        if (err instanceof ApplicationException) {
            return res.status(err.status).send({
                message: err.message,
                status: err.status,
                errors: err.errors,
            });
        } else {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
                message: err.message,
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static initializeUnhandledException() {
        process.on('unhandledRejection', reason => {
            ErrorHandler.#logger.error({
                name: reason.name,
                message: reason.message,
            });
            ErrorHandler.#logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
            throw reason;
        });

        process.on('uncaughtException', err => {
            ErrorHandler.#logger.error({
                name: err.name,
                message: err.message,
            });

            ErrorHandler.#logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
            process.exit(1);
        });
    }
}
