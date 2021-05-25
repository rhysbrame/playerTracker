const express = require('express');
const router = express.Router();

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
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const team = await Team.findById(id).populate('RosterPlayerIDs');
    res.render('teams/details', { team });
  })
);

module.exports = router;
