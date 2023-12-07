import Joi from "joi";

export const loginResolver = Joi.object({
  phone: Joi.string()
    .label("Phone Number")
    .pattern(/01\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    }),
  password: Joi.string().label("Password").min(6).required(),
  remember: Joi.boolean().default(true),
});
