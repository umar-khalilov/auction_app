'use strict';

/**
 * @param {function} handler
 * @returns {function}
 */
const asyncWrapper = handler => async (req, res, next) => {
    return Promise.resolve(handler(req, res, next))
        .then(response => res.status(response.status).send(response.data))
        .catch(err => next(err));
};

/**
 * @param {array} data
 * @param {number} page
 * @param {number} limit
 * @returns {object}
 */
const paginateResponse = (data = [], page = 1, limit = 10) => {
    const [itemCount, result] = data;
    const pageCount = Math.ceil(itemCount / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;
    return {
        data: [...result],
        meta: {
            page,
            limit,
            itemCount,
            pageCount,
            hasPreviousPage,
            hasNextPage,
        },
    };
};

/**
 * @param {object} obj
 * @param {...string} keys
 * @returns {object}
 */
const omit = (obj, ...keys) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
};
/**
 * @param {object} obj
 * @param {...string} keys
 * @returns {object}
 */
const pick = (obj, ...keys) => {
    return Object.fromEntries(keys.filter(key => key in obj).map(key => [key, obj[key]]));
};

/**
 * @param {Array<Class>} entities
 * @param {Array<Class>} services
 * @param {Array<Class>} controllers
 * @returns {object}
 */
const makePlainDIContainer = (entities = [], services = [], controllers = []) => {
    const container = {};
    entities.forEach(entity => (container[entity.name] = new entity()));
    services.forEach(service => (container[service.name] = new service(container)));
    controllers.forEach(controller => (container[controller.name] = new controller(container)));
    return container;
};

export { asyncWrapper, paginateResponse, omit, pick, makePlainDIContainer };
