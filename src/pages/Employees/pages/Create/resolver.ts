import Joi from "joi";

export const EmployeeCreateResolver = Joi.object({
	display_picture: Joi.string()
		.label("Display Image")
		.trim()
		.allow("")
		.allow(null),
	first_name: Joi.string().required().label("First Name").trim(),
	last_name: Joi.string().required().label("Last Name").trim(),
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
	address: Joi.string().label("Addess").trim(),
	dob: Joi.any().label("Date of Birth"),
	password: Joi.string().label("Password").min(6).required().trim(),
	role_id: Joi.number().label("Role"),
	max_session: Joi.string().label("Maximum Device"),
});
