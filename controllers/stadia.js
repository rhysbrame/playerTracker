const Stadium = require('../models/stadium');

module.exports.index = async (req, res) => {
  const stadia = await Stadium.find({});
  for (const stadium of stadia) {
    const stadiumGeometry = stadium.Coordinates;
    stadium.geometry = stadiumGeometry;
    await stadium.save();
  }
  res.render('stadia/index', { stadia });
};
