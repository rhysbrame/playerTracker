const mongoose = require('mongoose');
const { Schema } = mongoose;

const opts = { toJSON: { virtuals: true } };

const collegeTeamSchema = new Schema(
  {
    TeamID: { type: Number, required: true },
    Key: { type: String, required: true },
    School: { type: String, required: true },
    Name: { type: String, required: true },
    StadiumID: { type: Number, required: true },
    GlobalTeamID: { type: Number, required: true },
    TeamLogoUrl: { type: String, required: true },
    ConferenceID: { type: Number },
    Conference: { type: String },
    ShortDisplayName: { type: String, required: true },
    UserFavourited: {
      type: Boolean,
      required: true,
      default: false,
    },
    RosterPlayerIDs: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    Swatches: {
      Vibrant: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
      DarkVibrant: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
      LightVibrant: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
      Muted: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
      DarkMuted: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
      LightMuted: {
        _rgb: [{ type: Number }, { type: Number }, { type: Number }],
      },
    },
    StadiumData: { type: Schema.Types.ObjectId, ref: 'Stadium' },
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

collegeTeamSchema.virtual('Coordinates').get(function () {
  const geometryObject = {
    type: 'Point',
    coordinates: [this.StadiumData.GeoLong, this.StadiumData.GeoLat],
  };
  return geometryObject;
});

collegeTeamSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong>
    <a href="/teams/${this._id}">${this.School} ${this.Name}</a>
  <strong>
  `;
});

module.exports = mongoose.model('Team', collegeTeamSchema);
