const Stadium = require('../models/stadium');

module.exports.index = async (req, res) => {
  const stadia = await Stadium.find({});
  res.render('stadia/index', { stadia });
};
