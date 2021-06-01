const mongoose = require('mongoose');
const Vibrant = require('node-vibrant');

const Stadium = require('../models/stadium');
const Team = require('../models/team');
const Player = require('../models/player');
const { stadiaSeeds } = require('./stadiaSeeds');
const { teamSeeds } = require('./teamSeeds');
const { playerSeeds } = require('./playerSeeds');

mongoose.connect('mongodb://localhost:27017/playerTracker', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const masterSeedDB = async () => {
  await Stadium.deleteMany({});
  for (const stadium of stadiaSeeds) {
    const s = new Stadium(stadium);
    await s.save();
  }
  await Team.deleteMany({});
  let counter = 0;
  for (const team of teamSeeds) {
    counter++;
    const t = new Team(team);
    const { StadiumID } = team;
    const teamStadium = await Stadium.findOne({ StadiumID });
    t.StadiumData = teamStadium;
    const swatches = await Vibrant.from(`${team.TeamLogoUrl}`).getSwatches();
    console.log(counter, '/252 Number of team swatches');
    t.Swatches = swatches;
    await t.save();
  }
  await Player.deleteMany({});
  for (const player of playerSeeds) {
    const p = new Player(player);
    const { TeamID } = player;
    const team = await Team.findOne({ TeamID });
    team.RosterPlayerIDs.push(p);
    p.PlayerTeamID = team;
    await p.save();
    await team.save();
  }
};

masterSeedDB().then(() => {
  mongoose.connection.close();
});
