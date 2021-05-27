const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const { isLoggedIn } = require('../utilities/middleware');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const Team = require('../models/team');

router.get(
  '/',
  catchAsyncWrapper(async (req, res) => {
    const teams = await Team.find({});
    res.render('teams/index', { teams });
  })
);

router.get(
  '/:id',
  isLoggedIn,
  catchAsyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      req.flash('error', 'Could not find that team, Invalid ID!');
      return res.redirect('/teams/');
    }
    const team = await Team.findById(id).populate('RosterPlayerIDs');
    if (!team) {
      req.flash('error', 'Could not find that team!');
      return res.redirect('/teams/');
    }
    res.render('teams/details', { team });
  })
);

module.exports = router;
