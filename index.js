'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const autoshops = require('./autoshops');

const { PORT, CLIENT_ORIGIN } = require('./config');
const {dbConnect} = require('./db-knex');

const app = express();

// Parse request body
app.use(express.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/', (req, res) => {
  const res_data = autoshops.map(autoshop => autoshop.name);
  res.json(res_data);
});

app.post('/', (req, res) => {
  const {name, address, phone, hours, services} = req.body;
  const new_shop = {name, address, phone, hours, services};
  autoshops.push(new_shop);
  res.json(new_shop.name);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
