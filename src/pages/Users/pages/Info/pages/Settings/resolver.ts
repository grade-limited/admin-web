import Joi from "joi";

export const updatePasswordResolver = Joi.object({
  new_password: Joi.string().label("Password").min(6).required().trim(),
  confirm_password: Joi.any()
    .label("Confirm New Password")
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
    }),
});
