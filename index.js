const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Player = require('./models/player');

mongoose.connect('mongodb://localhost:27017/playerTracker', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home');
})

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