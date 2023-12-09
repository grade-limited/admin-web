import Joi from "joi";

export const productCreateResolver = Joi.object({
  thumbnail_url: Joi.string().label("Thumbnail Image").trim(),
  name: Joi.string().required().label("Product Name").trim(),
  description: Joi.string().label("Description").trim(),
  brand_id: Joi.string().label("Brand").trim(),
  category_id: Joi.string().required().label("Category").trim(),
});
