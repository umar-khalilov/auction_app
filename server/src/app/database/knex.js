'use strict';
import knex from 'knex';
import { configuration } from '@configs/envConfigs.js';
import knexConfig from './knexfile.js';

const environment = configuration.nodeEnv || 'development';
const db = knex(knexConfig[environment]);

export default db;
