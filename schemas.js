const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    Rating: Joi.number().required(),
    Body: Joi.string().required(),
  }).required(),
});
