import Joi from "joi";

export const UpdateResolver = Joi.object({
  display_picture: Joi.string()
    .label("Display Image")
    .trim()
    .allow("")
    .allow(null),
  first_name: Joi.string().label("First Name").trim(),
  last_name: Joi.string().label("Last Name").trim(),
  email: Joi.string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .label("Email")
    .messages({
      "string.pattern.base": "Invalid Email Address",
    })
    .allow("")
    .allow(null)
    .trim(),
  gender: Joi.string().label("Gender").trim(),
  phone: Joi.string()
    .pattern(/01\d{9}$/)
    .label("Phone")
    .messages({
      "string.pattern.base": "Invalid Phone Number",
    })
    .required()
    .trim(),
  address: Joi.string().label("Addess").trim().allow("").allow(null),
  dob: Joi.any().label("Date of Birth"),
});

/*first_name: user.first_name,
last_name: user?.last_name,
phone: user?.phone,
email: user?.email,
display_picture: user?.display_picture,
gender: user?.gender,
dob: user?.dob,
bank: user?.bank,
address: user?.address,*/
