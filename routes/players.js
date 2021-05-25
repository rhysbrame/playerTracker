const express = require('express');
const router = express.Router();

const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const ExpressError = require('../utilities/ExpressError');
const Team = require('../models/team');
const Player = require('../models/player');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas');

const getPlayer = catchAsyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  res.locals.player = await Player.findById(id).populate('Reviews');
  next();
});

const getTeamFromPlayer = catchAsyncWrapper(async (req, res, next) => {
  const teamId = res.locals.player.TeamID;
  const teamArray = await Team.find({ TeamID: teamId });
  res.locals.team = teamArray[0];
  next();
});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  '/',
  catchAsyncWrapper(async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', { players });
  })
);

router.get('/:id', getPlayer, getTeamFromPlayer, (req, res) => {
  const { player, team } = res.locals;
  res.render('players/details', { player, team });
});

router.post(
  '/:id/reviews',
  validateReview,
  catchAsyncWrapper(async (req, res) => {
    const player = await Player.findById(req.params.id);
    const review = new Review(req.body.review);
    player.Reviews.push(review);
    await review.save();
    await player.save();
    req.flash('success', 'Succesfully created a new review');
    res.redirect(`/players/${player._id}`);
  })
);

router.delete(
  '/:id/reviews/:reviewId',
  catchAsyncWrapper(async (req, res) => {
    const { id, reviewId } = req.params;
    await Player.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/players/${id}`);
  })
);

module.exports = router;
