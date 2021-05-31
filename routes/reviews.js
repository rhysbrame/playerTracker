const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require('../utilities/middleware');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');

router.post('/', isLoggedIn, validateReview, catchAsyncWrapper(reviews.create));

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsyncWrapper(reviews.delete)
);

module.exports = router;
