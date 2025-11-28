const Joi = require("joi");

const dietPlanValidation = Joi.object({
  title: Joi.string().trim().required(),
  features: Joi.array().items(Joi.string().required()).min(1).required(),
  duration: Joi.string().valid("weekly", "monthly", "custom").required(),
  customDuration: Joi.string().when("duration", {
    is: "custom",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  pricing: Joi.number().min(0).required(),
  category: Joi.string().optional().allow(""),
});

const blogValidation = Joi.object({
  title: Joi.string().trim().required(),
  bannerImage: Joi.string().uri().optional(),
  body: Joi.string().required(),
  date: Joi.date().optional(),
});

module.exports = {
  dietPlanValidation,
  blogValidation,
};
