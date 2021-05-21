const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  Body: String,
  Rating: Number,
  Username: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
