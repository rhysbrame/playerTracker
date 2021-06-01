const mongoose = require('mongoose');
const { Schema } = mongoose;

const collegeTeamSchema = new Schema({
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
});

module.exports = mongoose.model('Team', collegeTeamSchema);
