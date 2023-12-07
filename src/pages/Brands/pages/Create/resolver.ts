import Joi from "joi";

export const brandCreateResolver = Joi.object({
  thumbnail_url: Joi.string().label("Thumbnail Image").trim(),
  cover_url: Joi.string().label("Cover Image").trim(),
  name: Joi.string().required().label("Brand Name").trim(),
  description: Joi.string().label("Description").trim(),
});
