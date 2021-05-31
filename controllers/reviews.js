const Review = require('../models/review');
const Player = require('../models/player');

module.exports.create = async (req, res) => {
  const player = await Player.findById(req.params.id);
  const review = new Review(req.body.review);
  review.Author = req.user._id;
  player.Reviews.push(review);
  await review.save();
  await player.save();
  req.flash('success', 'Succesfully created a new review');
  res.redirect(`/players/${player._id}`);
};

module.exports.delete = async (req, res) => {
  const { id, reviewId } = req.params;
  await Player.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'You succesfully deleted the post');
  res.redirect(`/players/${id}`);
};
