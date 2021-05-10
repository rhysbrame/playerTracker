const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    number: {
        type: Number
    },
    position: {
        type: String,
        upperCase: true,
        enum: [ 'C', 'CB', 'DB', 'DE', 'DE/LB', 'DL', 'DT', 'FB', 'FS', 'G', 'ILB', 'K', 'KR', 'LB', 'LS', 'NT', 'OL', 'OLB', 'OT', 'P', 'QB', 'RB', 'S', 'SS', 'T', 'TE', 'WR' ]
    },
    team: {
        type: String
    },
    teamID: {
        type: Number
    },
    photoUrl: {
        type: String
    },
    userFavourited: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player;