###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:22.22.0-alpine as development
WORKDIR /usr/src/app
COPY --chown=node:node package.json && yarn.lock ./
RUN yarn ci
COPY --chown=node:node ./ ./
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:22.22.0-alpine as build
WORKDIR /usr/src/app
COPY --chown=node:node package.json && yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn start:prod
ENV NODE_ENV production
RUN yarn ci --only=production && yarn cache clean --force
USER node

###################
# PRODUCTION
###################
FROM node:22.22.0-alpine as production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
CMD [ "node", "/src/main.js" ]