const mongoose = require('mongoose');
const Vibrant = require('node-vibrant');

const Player = require('../models/player');
const Team = require('../models/team');
const { playerSeeds } = require('./playerSeeds');
const { teamSeeds } = require('./teamSeeds');

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
  await Team.deleteMany({});
  let counter = 0;
  for (const team of teamSeeds) {
    counter++;
    const t = new Team(team);
    const swatches = await Vibrant.from(`${team.TeamLogoUrl}`).getSwatches();
    console.log('Number of team swatches from 252', counter);
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
