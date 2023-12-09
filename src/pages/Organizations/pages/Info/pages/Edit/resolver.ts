import Joi from "joi";

export const organizationUpdateResolver = Joi.object({
  name: Joi.string().label("Organization Name").trim(),
  contact_email: Joi.string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .label("Email")
    .messages({
      "string.pattern.base": "Invalid Email Address",
    })
    .allow("")
    .allow(null)
    .trim(),
  contact_number: Joi.string()
    .pattern(/01\d{9}$/)
    .label("Number")
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    })
    .allow("")
    .allow(null)
    .trim(),
  businessType: Joi.array().label("Business Type").required(),
  website_url: Joi.string()
    .label("Website Link")
    .pattern(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    )
    .allow("")
    .allow(null),
  linkedin_url: Joi.string()
    .pattern(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    )
    .label("LinkedIn")
    .allow("")
    .allow(null),
  facebook_url: Joi.string()
    .pattern(
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
    )
    .label("Facebook")
    .allow("")
    .allow(null),
  instagram_url: Joi.string()
    .pattern(/(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/)
    .label("Instagram")
    .allow("")
    .allow(null),
});
