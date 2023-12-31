import Joi from "joi";

export const campaignCreateResolver = Joi.object({
  thumbnail_url: Joi.string()
    .label("Thumbnail Image")
    .trim()
    .allow("")
    .allow(null),
  campaign_url: Joi.string()
    .label("Campaign Link")
    .pattern(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    )
    .allow("")
    .allow(null),
  cover_url: Joi.string().label("Cover Image").trim().allow("").allow(null),
  name: Joi.string().required().label("Campaign Name").trim(),
  description: Joi.string().label("Description").trim().allow("").allow(null),
  campaign_type: Joi.string().label("Campaign Type").trim().allow(null),
  amount_type: Joi.string().label("Amount Type").trim().allow(null).allow(""),
  amount: Joi.number().label("Amount").allow(null).allow(""),
  start_date: Joi.date().label("Start Date").allow(null),
  end_date: Joi.date().label("End Date").allow(null),
  range: Joi.array(),
  is_active: Joi.boolean().label("Active Status").default(true),
});
