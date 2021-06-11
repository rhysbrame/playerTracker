const mongoose = require('mongoose');
const { Schema } = mongoose;

const opts = { toJSON: { virtuals: true } };

const stadiumSchema = new Schema(
  {
    StadiumID: { type: Number, required: true },
    Active: { type: Boolean, required: true },
    Name: { type: String, required: true },
    Dome: { type: Boolean, required: true },
    City: { type: String, required: true },
    State: { type: String },
    GeoLat: { type: Number, required: true },
    GeoLong: { type: Number, required: true },
    type: { type: String, default: 'Feature' },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  opts
);

stadiumSchema.virtual('Coordinates').get(function () {
  const geometryObject = {
    type: 'Point',
    coordinates: [this.GeoLong, this.GeoLat],
  };
  return geometryObject;
});

stadiumSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong>
    <a href="/stadia/${this._id}">${this.Name}- ${this.City}, ${this.State}</a>
  <strong>
  `;
});

module.exports = mongoose.model('Stadium', stadiumSchema);
