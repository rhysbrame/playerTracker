const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const catchAsyncWrapper = require('./utilities/catchAsyncWrapper.js')
const ExpressError = require('./utilities/ExpressError')

const Player = require('./models/player');
const Team = require('./models/team');
const { stat } = require('fs');

mongoose.connect('mongodb://localhost:27017/playerTracker', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now()
    console.log("This is a middleware");
    return next();
})

app.get('/', (req, res) => {
    console.log(`Request date: ${req.requestTime}`)
    res.render('home');
})

app.get('/players', catchAsyncWrapper(async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', {players})
}))

app.get('/players/:id', catchAsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    res.render('players/details', {player})
}))

app.get('/teams', catchAsyncWrapper(async (req, res) => {
    const teams = await Team.find({});
    res.render('teams/index', {teams})
}))

app.get('/teams/:id', catchAsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const team = await Team.findById(id);
    res.render('teams/details', {team})
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh, No. Something Went Wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})