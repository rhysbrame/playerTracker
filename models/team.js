const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stadiumName: {
        type: String,
        required: true
    }
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team;