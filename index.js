const express = require('express');
const app = express();
const path = require('path');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/players', async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', {players})
})

app.get('/players/:id', async (req, res) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    res.render('players/details', {player})
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})