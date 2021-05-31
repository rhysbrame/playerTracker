const ObjectID = require('mongodb').ObjectID;
const Team = require('../models/team');
const Player = require('../models/player');
const Review = require('../models/review');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const ExpressError = require('../utilities/ExpressError');
const { reviewSchema } = require('../schemas');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be signed in');
    return res.redirect('/login');
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.Author.equals(req.user._id)) {
    req.flash('error', 'You dont have the permission');
    return res.redirect(`/players/${id}`);
  }
  next();
};

module.exports.getPlayer = catchAsyncWrapper(async (req, res, next) => {
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
  if (!res.locals.player) {
    req.flash('error', 'Could not find that player!');
    return res.redirect('/players/');
  }
  next();
});

module.exports.getTeamFromPlayer = catchAsyncWrapper(async (req, res, next) => {
  const teamId = res.locals.player.TeamID;
  const teamArray = await Team.find({ TeamID: teamId });
  res.locals.team = teamArray[0];
  next();
});

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
