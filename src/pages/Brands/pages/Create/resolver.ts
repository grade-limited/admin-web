import Joi from "joi";

export const brandCreateResolver = Joi.object({
  thumbnail_url: Joi.string()
    .label("Thumbnail Image")
    .trim()
    .allow("")
    .allow(null),
  cover_url: Joi.string().label("Cover Image").trim().allow("").allow(null),
  name: Joi.string().required().label("Brand Name").trim(),
  description: Joi.string().label("Description").trim(),
});
