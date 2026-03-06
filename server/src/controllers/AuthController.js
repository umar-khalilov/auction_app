import { Router } from 'express';
import { AuthService } from '@services/AuthService';
import { LoggerService } from '@common/services/LoggerService';
import { SuccessResponse } from '@utils/SuccessResponse';
import { validate } from '@common/middlewares/validate';
import { asyncWrapper } from '@utils/helpers';
import { signInSchema, signUpSchema } from '@common/schemas/authSchemas';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { ResponseUserDto } from '@dto/ResponseUserDto';

export class AuthController {
    /** @type {AuthService} */
    #authService;
    /** @type {Router} */
    #router;
    /** @type {string} */
    #path;
    /** @type {LoggerService} */
    #logger;

    /**
     * @param {AuthService} authService
     */
    constructor(authService) {
        this.#logger = new LoggerService(AuthController.name);
        this.#router = new Router({
            caseSensitive: true,
            mergeParams: true,
            strict: true,
        });
        this.#authService = authService;
        this.#path = '/auth';
        this.#initializeRoutes();
        this.#logger.log('Initialized');
    }

    get router() {
        return this.#router;
    }

    #signUp = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const signedUser = await this.#authService.signUp({
            ...body,
            userAgent,
        });
        return new SuccessResponse({ user: new ResponseUserDto(signedUser) }, HttpStatusCodes.CREATED);
    });

    #signIn = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const signedUser = await this.#authService.signIn({
            ...body,
            userAgent,
        });
        return new SuccessResponse({ user: new ResponseUserDto(signedUser) });
    });

    /*
    #signOut = asyncWrapper(async req => {
        req.res.setHeader('Authorization', null);
        await this.#refreshTokenService.removeToken(req.body?.refresh);
        return new SuccessResponse({ data: 'You are successfully signed out' });
    });
    */

    #initializeRoutes() {
        this.router.post(`${this.#path}/sign-up`, validate(signUpSchema), this.#signUp);
        this.router.post(`${this.#path}/sign-in`, validate(signInSchema), this.#signIn);
    }
}
