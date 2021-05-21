const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  User: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
