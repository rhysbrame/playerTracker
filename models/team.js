const mongoose = require('mongoose');

const collegeTeamSchema = new mongoose.Schema({
    TeamID: { type: Number, required: true },
    Key: { type: String, required: true },
    School: { type: String, required: true },
    Name: { type: String, required: true },
    StadiumID: { type: Number, required: true },
    GlobalTeamID: { type: Number, required: true },
    TeamLogoUrl: { type: String, required: true },
    ConferenceID: { type: Number },
    Conference: { type: String },
    ShortDisplayName: { type: String, required: true }
})

const Team = mongoose.model('Team', collegeTeamSchema)

module.exports = Team;