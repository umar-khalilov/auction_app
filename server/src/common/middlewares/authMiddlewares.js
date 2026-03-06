'use strict';
import { UnauthorizedException } from '@common/exceptions';
import { JwtService } from '@common/services/JwtService';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const verifyAccessToken = async (req, res, next) => {
    try {
        const {
            headers: { authorization },
        } = req;
        const [bearer, token] = authorization?.split(' ') || [];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('User is not authorizated');
        }
        req.locals.accessToken = await new JwtService().verifyAccessToken(token);
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const verifyRefreshToken = async (req, res, next) => {
    try {
        const {
            body: { refresh },
        } = req;
        if (!refresh) {
            throw new UnauthorizedException('User is not authorizated');
        }
        req.locals.refreshToken = await new JwtService().verifyRefreshToken(refresh);
        next();
    } catch (error) {
        next(error);
    }
};

export { verifyAccessToken, verifyRefreshToken };
