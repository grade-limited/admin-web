import Joi from "joi";

export const productUpdateResolver = Joi.object({
  thumbnail_url: Joi.string().label("Thumbnail Image").trim(),
  name: Joi.string().label("Product Name").trim(),
  description: Joi.string().label("Description").trim(),
  brand_id: Joi.number().label("Brand"),
  category_id: Joi.number().required().label("Category"),
});
