const mongoose = require('mongoose');
const { Schema } = mongoose;

const stadiumSchema = new Schema({
  StadiumID: { type: Number, required: true },
  Active: { type: Boolean, required: true },
  Name: { type: String, required: true },
  Dome: { type: Boolean, required: true },
  City: { type: String, required: true },
  State: { type: String },
  GeoLat: { type: Number, required: true },
  GeoLong: { type: Number, required: true },
});

module.exports = mongoose.model('Stadium', stadiumSchema);
