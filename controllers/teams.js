const Team = require('../models/team');
const ObjectID = require('mongodb').ObjectID;

module.exports.index = async (req, res) => {
  const teams = await Team.find({}).populate('StadiumData');
  console.log('************');
  res.render('teams/index', { teams });
};

module.exports.details = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    req.flash('error', 'Could not find that team, Invalid ID!');
    return res.redirect('/teams/');
  }
  const team = await Team.findById(id).populate('RosterPlayerIDs');
  if (!team) {
    req.flash('error', 'Could not find that team!');
    return res.redirect('/teams/');
  }
  res.render('teams/details', { team });
};
