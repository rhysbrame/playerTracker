const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const Player = require('../models/player');

module.exports.index = async (req, res) => {
  const players = await Player.find({});
  res.render('players/index', { players });
};

module.exports.details = async (req, res) => {
  const { player, team } = res.locals;
  const teamName = team.Name;
  const playerLocation = player.BirthCity + ', ' + player.BirthState;
  const geoData = await geocoder
    .forwardGeocode({
      query: playerLocation,
      limit: 1,
      countries: ['us'],
    })
    .send();
  const geometry = geoData.body.features[0].geometry;
  res.render('players/details', { player, team, teamName, geometry });
};
