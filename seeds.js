const mongoose = require('mongoose');

const Player = require('./models/player');

mongoose.connect('mongodb://localhost:27017/playerTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("Mongoose ERROR!")
        console.log(err)
    })

const seedPlayers = [
    {
        playerId: 20875,
        firstname: 'DK',
        lastname: 'Metcalf',
        number: 14,
        position: 'WR',
        team: 'SEA',
        teamID: 30,
        photoUrl: 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20875.png'
    },
    {
        playerId: 14536,
        firstname: 'Russell',
        lastname: 'Wilson',
        number: 3,
        position: 'QB',
        team: 'SEA',
        teamID: 30,
        photoUrl: 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14536.png'
    },
    {
        playerId: 16830,
        firstname: 'Tyler',
        lastname: 'Lockett',
        number: 16,
        position: 'WR',
        team: 'SEA',
        teamID: 30,
        photoUrl: 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16830.png'
    },
    {
        playerId: 18923,
        firstname: 'Jamal',
        lastname: 'Adams',
        number: 33,
        position: 'SS',
        team: 'SEA',
        teamID: 30,
        photoUrl: 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16830.png'
    },
    {
        playerId: 14534,
        firstname: 'Bobby',
        lastname: 'Wagner',
        number: 54,
        position: 'ILB',
        team: 'SEA',
        teamID: 30,
        photoUrl: 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14534.png'
    }
]

Player.insertMany (seedPlayers)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})