const express = require('express');
const router = express.Router();

const players = require('../controllers/players');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const {
  isLoggedIn,
  getPlayer,
  getTeamFromPlayer,
} = require('../utilities/middleware');

router.get('/', catchAsyncWrapper(players.index));

router.get('/:id', isLoggedIn, getPlayer, getTeamFromPlayer, players.details);

module.exports = router;
