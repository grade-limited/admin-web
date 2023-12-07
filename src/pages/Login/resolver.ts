import Joi from "joi";

export const loginResolver = Joi.object({
  phone: Joi.string()
    .label("Phone Number")
    .pattern(/01\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    })
    .trim(),
  password: Joi.string().label("Password").min(6).required().trim(),
  remember: Joi.boolean().default(true),
});
