const Review = require('../models/review');

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
