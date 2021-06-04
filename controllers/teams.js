const Stadium = require('../models/stadium');
const Team = require('../models/team');
const ObjectID = require('mongodb').ObjectID;

module.exports.index = async (req, res) => {
  const newArray = [];
  let teams = await Team.find(
    {}
    // {
    //   _id: 0,
    //   geometry: 1,
    //   type: 1,
    //   StadiumData: {
    //     GeoLat: 1,
    //     GeoLong: 1,
    //   },
    // }
  ).populate('StadiumData');
  for (let team of teams) {
    console.log('*******loopout', team.Name);
    if (team.StadiumData) {
      newArray.push(team);
      console.log('*******loop', team.Name);
      const stadiumGeometry = team.Coordinates;
      team.geometry = stadiumGeometry;
      await team.save();
    }
  }
  console.log('****', newArray.length);
  console.log('****', teams.length);
  teams = newArray;
  // teams.length = 200;
  console.log('**final_teams**', teams);
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
