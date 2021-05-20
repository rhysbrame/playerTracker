const mongoose = require('mongoose');
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
  for (const team of teamSeeds) {
    const t = new Team(team);
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
