import { Router } from 'express';
import { UserService } from '@services/UserService';
import { LoggerService } from '@common/services/LoggerService';
import { SuccessResponse } from '@utils/SuccessResponse';
import { asyncWrapper } from '@utils/helpers';
import { validate } from '@common/middlewares/validate';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { parseIntPipe } from '@common/middlewares/parseIntPipe';
import { paginate } from '@common/middlewares/paginate';

export class UserController {
    /** @type {UserService} */
    #userService;
    /** @type {Router} */
    #router;
    /** @type {string} */
    #path;
    /** @type {LoggerService} */
    #logger;

    /**
     * @param {UserService} userService
     */
    constructor(userService) {
        this.#logger = new LoggerService(UserController.name);
        this.#router = new Router({
            caseSensitive: true,
            mergeParams: true,
            strict: true,
        });
        this.#userService = userService;
        this.#path = '/users';
        this.#initializeRoutes();
        this.#logger.log('Initialized');
    }

    get router() {
        return this.#router;
    }

    #findAll = asyncWrapper(async ({ pagination }) => {
        const users = await this.#userService.findAll(pagination);
        return new SuccessResponse(users);
    });

    #findOne = asyncWrapper(async ({ params: { id } }) => {
        const user = await this.#userService.findById(id);
        return new SuccessResponse({ data: user });
    });

    #updateOne = asyncWrapper(async ({ params: { id }, body }) => {
        const updatedUser = await this.#userService.updateById(id, body);
        return new SuccessResponse({ data: updatedUser }, HttpStatusCodes.ACCEPTED);
    });

    #removeOne = asyncWrapper(async ({ params: { id } }) => {
        await this.#userService.removeById(id);
        return new SuccessResponse(null, HttpStatusCodes.NO_CONTENT);
    });

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAll);
        this.router
            .route(`${this.#path}/:id`)
            .get(parseIntPipe('id'), this.#findOne)
            .patch(parseIntPipe('id'), validate(updateUserSchema), this.#updateOne)
            .delete(parseIntPipe('id'), this.#removeOne);
    }
}
