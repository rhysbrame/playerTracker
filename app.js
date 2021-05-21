const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { stat } = require('fs');
const methodOverride = require('method-override');

const ExpressError = require('./utilities/ExpressError');
const catchAsyncWrapper = require('./utilities/catchAsyncWrapper.js');
const Player = require('./models/player');
const Team = require('./models/team');
const Review = require('./models/review');
const { reviewSchema } = require('./schemas');

mongoose.connect('mongodb://localhost:27017/playerTracker', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});

const getPlayer = catchAsyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  res.locals.player = await Player.findById(id).populate('Reviews');
  next();
});

const getTeamFromPlayer = catchAsyncWrapper(async (req, res, next) => {
  const teamId = res.locals.player.TeamID;
  const teamArray = await Team.find({ TeamID: teamId });
  res.locals.team = teamArray[0];
  next();
});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get(
  '/players',
  catchAsyncWrapper(async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', { players });
  })
);

app.get('/players/:id', getPlayer, getTeamFromPlayer, (req, res) => {
  const { player, team } = res.locals;
  res.render('players/details', { player, team });
});

app.post(
  '/players/:id/reviews',
  validateReview,
  catchAsyncWrapper(async (req, res) => {
    const player = await Player.findById(req.params.id);
    const review = new Review(req.body.review);
    player.Reviews.push(review);
    await review.save();
    await player.save();
    res.redirect(`/players/${player._id}`);
  })
);

app.delete(
  '/players/:id/reviews/:reviewId',
  catchAsyncWrapper(async (req, res) => {
    const { id, reviewId } = req.params;
    await Player.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/players/${id}`);
  })
);

app.get(
  '/teams',
  catchAsyncWrapper(async (req, res) => {
    const teams = await Team.find({});
    res.render('teams/index', { teams });
  })
);

app.get(
  '/teams/:id',
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const team = await Team.findById(id).populate('RosterPlayerIDs');
    res.render('teams/details', { team });
  })
);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh, No. Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
