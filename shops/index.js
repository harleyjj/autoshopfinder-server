'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {dbGet} = require('../db-knex');

const router = express.Router();
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

const jsonParser = bodyParser.json();

router.get('/:id', jsonParser, (req, res, next) => {
  const id = req.params.id;

  dbGet().select(
    'id', 
    'name',
    'street',
    'city',
    'state',
    'zip',
    'phone',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
    'oilchanges',
    'batteryinstallation',
    'filterreplacement',
    'fluidexchanges',
    'fuelsystemservices',
    'scheduledoemaintenance',
    'winterpreppackage',
    'summerpreppackage',
    'wheelalignment',
    'tirerepair',
    'tireinstallation',
    'acheat',
    'beltsandhoses',
    'brakeservices',
    'diagnostics',
    'checkengine',
    'suspension',
    'performance',
    'caraudio',
    'stateinspection',
    'transmissions'
  )
    .from('autoshops')
    .where('id', id)
    .then(items => {
      if(items) {
        res.json(items[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};