import Joi from "joi";

export const userUpdateResolver = Joi.object({
  display_picture: Joi.string()
    .label("Display Image")
    .trim()
    .allow("")
    .allow(null),
  first_name: Joi.string().required().label("First Name").trim(),
  last_name: Joi.string().required().label("Last Name").trim(),
  gender: Joi.string().label("Gender").trim(),
  dob: Joi.date().label("Date of Birth"),
  email: Joi.string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .label("Email")
    .messages({
      "string.pattern.base": "Invalid Email Address",
    })
    .allow("")
    .allow(null)
    .trim(),
  phone: Joi.string()
    .pattern(/01\d{9}$/)
    .label("Phone")
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    })
    .allow("")
    .allow(null)
    .trim(),
  address: Joi.string().label("Address").trim(),
  max_session: Joi.number().label("Maximum Device"),
});
