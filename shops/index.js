'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {dbGet} = require('../db-knex');

const router = express.Router();
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

const jsonParser = bodyParser.json();

router.get('/:username', jsonParser, (req, res, next) => {
  const username = req.params.username;

  dbGet().select(
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
    .where('username', username)
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

// Put update an item
router.put('/:username', jsonParser, (req, res, next) => {
  const username = req.params.username;

  const { 
    shopname,
    street,
    city,
    state,
    zip,
    phone,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    oilchanges,
    batteryinstallation,
    filterreplacement,
    fluidexchanges,
    fuelsystemservices,
    scheduledoemaintenance,
    winterpreppackage,
    summerpreppackage,
    wheelalignment,
    tirerepair,
    tireinstallation,
    acheat,
    beltsandhoses,
    brakeservices,
    diagnostics,
    checkengine,
    suspension,
    performance,
    caraudio,
    stateinspection,
    transmissions
  } = req.body;
  //console.log(`folder id's type is ${typeof folderId}`);
  const updateObj = { 
    name: shopname,
    street,
    city,
    state,
    zip,
    phone,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    oilchanges,
    batteryinstallation,
    filterreplacement,
    fluidexchanges,
    fuelsystemservices,
    scheduledoemaintenance,
    winterpreppackage,
    summerpreppackage,
    wheelalignment,
    tirerepair,
    tireinstallation,
    acheat,
    beltsandhoses,
    brakeservices,
    diagnostics,
    checkengine,
    suspension,
    performance,
    caraudio,
    stateinspection,
    transmissions
  };
  if (username !== '') {
    updateObj.username = username;
  }
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  dbGet('autoshops')
    .where('username', username)
    .update(updateObj)
    .returning('username')
    .then(items => {
      if (items) {
        res.status(200).json(items[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', jsonParser, (req, res, next) => {
  const { username, shopname } = req.body;
  //console.log(`folder id's type is ${typeof folderId}`);
  const newItem = { username, name: shopname };
  /***** Never trust users - validate input *****/
  if (!newItem.username) {
    const err = new Error('Missing `username` in request body');
    err.status = 400;
    return next(err);
  }
  if (!newItem.name) {
    const err = new Error('Missing `shopname` in request body');
    err.status = 400;
    return next(err);
  }

  dbGet('autoshops')
    .insert(newItem)
    .returning('name')
    .then(items => {
      if (items) {
        res.location(`${req.originalUrl}/${items[0].username}`).status(201).json(items[0]);
      } else {
        next();
      } 
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:username', jsonParser, (req, res, next) => {
  const username = req.params.username;

  dbGet('autoshops')
    .where('username', username)
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};