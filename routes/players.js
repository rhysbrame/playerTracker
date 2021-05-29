const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const { isLoggedIn } = require('../utilities/middleware');
const Team = require('../models/team');
const Player = require('../models/player');

const getPlayer = catchAsyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    req.flash('error', 'Could not find that player, Invalid ID!');
    return res.redirect('/players/');
  }
  res.locals.player = await Player.findById(id).populate({
    path: 'Reviews',
    populate: {
      path: 'Author',
    },
  });
  console.log('**route**', res.locals.player);
  if (!res.locals.player) {
    req.flash('error', 'Could not find that player!');
    return res.redirect('/players/');
  }
  next();
});

const getTeamFromPlayer = catchAsyncWrapper(async (req, res, next) => {
  const teamId = res.locals.player.TeamID;
  const teamArray = await Team.find({ TeamID: teamId });
  res.locals.team = teamArray[0];
  next();
});

router.get(
  '/',
  catchAsyncWrapper(async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', { players });
  })
);

router.get('/:id', isLoggedIn, getPlayer, getTeamFromPlayer, (req, res) => {
  const { player, team } = res.locals;
  res.render('players/details', { player, team });
});

module.exports = router;
