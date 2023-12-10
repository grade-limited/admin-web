import Joi from "joi";

export const categoryCreateResolver = Joi.object({
  thumbnail_url: Joi.string()
    .label("Thumbnail Image")
    .trim()
    .allow("")
    .allow(null),
  cover_url: Joi.string().label("Cover Image").trim().allow("").allow(null),
  icon_url: Joi.string().label("Icon Image").trim().allow("").allow(null),
  name: Joi.string().required().label("Category Name").trim(),
  description: Joi.string().label("Description").trim().allow("").allow(null),
  parent_id: Joi.any().label("Parent Category").allow(null),
  parent_hierarchy: Joi.any().label("Parent Category").allow(null),
});
