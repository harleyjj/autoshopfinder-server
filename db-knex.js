'use strict';

const createKnex = require('knex');

const {DATABASE_URL} = require('./config');

let knex = null;

function dbConnect(url = DATABASE_URL) {
  knex = createKnex({
    client: 'pg',
    connection: url
  });
}

function dbDisconnect() {
  return knex.destroy();
}

function dbGet(collection=null) {
  return knex(collection);
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};