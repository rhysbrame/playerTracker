const mongoose = require('mongoose');

const collegePlayerSchema = new mongoose.Schema({
    PlayerID: { type: Number, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    TeamID: { type: Number, required: true },
    Team: { type: String, required: true },
    Jersey: { type: Number, required: true },
    Position: { 
        type: String, 
        upperCase: true,
        enum: [ 'C', 'CB', 'DB', 'DE', 'DE/LB', 'DL', 'DT', 'FB', 'FS', 'G', 'ILB', 'K', 'KR', 'LB', 'LS', 'NT', 'OL', 'OLB', 'OT', 'P', 'QB', 'RB', 'S', 'SS', 'T', 'TE', 'WR' ]
    },
    PositionCategory: { type: String, required: true },
    Class: { type: String, required: true },
    Height: { type: Number, required: true },
    Weight: { type: Number, required: true },
    BirthCity: { type: String, required: true },
    BirthState: { type: String, required: true },
    GlobalTeamID: { type: Number, required: true },
    userFavourited: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Player = mongoose.model('Player', collegePlayerSchema)

module.exports = Player;