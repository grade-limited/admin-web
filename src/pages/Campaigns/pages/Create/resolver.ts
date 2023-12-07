import Joi from "joi";

export const campaignCreateResolver = Joi.object({
  thumbnail_url: Joi.string()
    .label("Thumbnail Image")
    .trim()
    .allow("")
    .allow(null),
  cover_url: Joi.string().label("Cover Image").trim().allow("").allow(null),
  name: Joi.string().required().label("Campaign Name").trim(),
  description: Joi.string().label("Description").trim().allow("").allow(null),
  campaign_type: Joi.string().label("Campaign Type").trim().allow(null),
  amount_type: Joi.string().required().label("Amount Type").trim(),
  amount: Joi.number().required().label("Amount"),
  start_date: Joi.date().label("Start Date").allow(null),
  end_date: Joi.date().label("End Date").allow(null),
  range: Joi.array(),
  is_active: Joi.boolean().label("Active Status").default(true),
});
