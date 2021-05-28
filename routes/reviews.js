const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../schemas');
const Review = require('../models/review');
const Player = require('../models/player');
const ExpressError = require('../utilities/ExpressError');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  '/',
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
  '/:reviewId',
  catchAsyncWrapper(async (req, res) => {
    const { id, reviewId } = req.params;
    await Player.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'You succesfully deleted the post');
    res.redirect(`/players/${id}`);
  })
);

module.exports = router;
