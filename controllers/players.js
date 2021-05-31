const Player = require('../models/player');

module.exports.index = async (req, res) => {
  const players = await Player.find({});
  res.render('players/index', { players });
};

module.exports.details = (req, res) => {
  const { player, team } = res.locals;
  res.render('players/details', { player, team });
};
