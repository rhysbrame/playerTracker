const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  Body: String,
  Rating: Number,
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
