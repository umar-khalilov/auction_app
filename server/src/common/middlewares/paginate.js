'use strict';
import { SortOrders } from '@app/constants';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const paginate = async (req, res, next) => {
    try {
        let {
            query: { sort = SortOrders.ASC, limit = 10, page = 1 },
        } = req;

        page = Number(!page || page <= 0 ? 1 : page);
        limit = Number(!limit || limit <= 0 || limit > 50 ? 50 : limit);

        const offset = (page - 1) * limit;

        req.locals.pagination = {
            page,
            sort,
            limit,
            offset,
        };
        next();
    } catch (err) {
        next(err);
    }
};
