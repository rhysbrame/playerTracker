const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    Body: Joi.string().required(),
    Rating: Joi.number().required(),
    Username: Joi.string().required(),
  }).required(),
});
