import Joi from "joi";

export const organizationCreateResolver = Joi.object({
  name: Joi.string().required().label("Organization Name").trim(),
  contact_email: Joi.string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .label("Email")
    .required()
    .messages({
      "string.pattern.base": "Invalid Email Address",
    })
    .allow("")
    .allow(null)
    .trim(),
  contact_number: Joi.string()
    .pattern(/01\d{9}$/)
    .label("Number")
    .required()
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    })
    .allow("")
    .allow(null)
    .trim(),
  businessType: Joi.string().label("Business Type").required().trim(),
  website_url: Joi.string()
    .label("Website Link")
    .pattern(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    ),
  linkedin_url: Joi.string()
    .pattern(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    )
    .label("LinkedIn"),
  facebook_url: Joi.string()
    .pattern(
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
    )
    .label("Facebook"),
  instagram_url: Joi.string()
    .pattern(/(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/)
    .label("Instagram"),
});