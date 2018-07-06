'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {dbGet} = require('../db-knex');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', jsonParser, (req, res, next) => {
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
    .orderBy('id')
    .then(list => {
      if(list) {
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

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