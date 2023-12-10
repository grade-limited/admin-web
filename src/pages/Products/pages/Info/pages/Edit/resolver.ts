import Joi from "joi";

export const productUpdateResolver = Joi.object({
  thumbnail_url: Joi.string()
    .label("Thumbnail Image")
    .trim()
    .allow("")
    .allow(null),
  name: Joi.string().label("Product Name").trim(),
  description: Joi.string().label("Description").trim().allow(null),
  brand_id: Joi.number().label("Brand").allow(null),
  category_id: Joi.number().required().label("Category"),
});
