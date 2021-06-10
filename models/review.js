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

module.exports = mongoose.model('Review', reviewSchema);
