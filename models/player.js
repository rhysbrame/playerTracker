const mongoose = require('mongoose');
const { Schema } = mongoose;

const collegePlayerSchema = new Schema({
  PlayerID: { type: Number, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  TeamID: { type: Number, required: true },
  Team: { type: String, required: true },
  Jersey: { type: Number, required: true },
  Position: {
    type: String,
    upperCase: true,
    enum: [
      'C',
      'CB',
      'DB',
      'DE',
      'DE/LB',
      'DL',
      'DT',
      'FB',
      'FS',
      'G',
      'ILB',
      'K',
      'KR',
      'LB',
      'LS',
      'NT',
      'OL',
      'OLB',
      'OT',
      'P',
      'QB',
      'RB',
      'S',
      'SS',
      'T',
      'TE',
      'WR',
    ],
  },
  PositionCategory: { type: String, required: true },
  Class: { type: String },
  Height: { type: Number, required: true },
  Weight: { type: Number, required: true },
  BirthCity: { type: String },
  BirthState: { type: String },
  GlobalTeamID: { type: Number, required: true },
  UserFavourited: {
    type: Boolean,
    required: true,
    default: false,
  },
  PlayerTeamID: { type: Schema.Types.ObjectId, ref: 'Team' },
  Reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Player = mongoose.model('Player', collegePlayerSchema);

module.exports = Player;
