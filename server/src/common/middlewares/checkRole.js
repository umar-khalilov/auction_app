'use strict';
import { RightsException } from '@common/exceptions/RightsException';
import { JwtService } from '@common/services/JwtService';
import { configuration } from '@configs/envConfigs';

/**
 * @param {string[]} roles
 * @returns {function(import('express').Request,
 * import('express').Response,
 * import('express').NextFunction): Promise<void>}
 */
export const checkRole = async (roles = []) => {
    return async (req, res, next) => {
        try {
            if (req.method === 'OPTIONS') {
                next();
            }
            const {
                locals: { accessToken },
            } = res;
            const { roles: userRoles } = await new JwtService().verifyAccessToken(
                accessToken,
                configuration.accessJWTSecret
            );
            let hasRole = false;
            for (const role of userRoles) {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            }
            if (!hasRole) {
                throw new RightsException();
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};
