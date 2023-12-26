import Joi from "joi";

export const productUpdateResolver = Joi.object({
	thumbnail_url: Joi.string()
		.label("Thumbnail Image")
		.trim()
		.allow("")
		.allow(null),
	name: Joi.string().label("Product Name").trim(),
	description: Joi.string().label("Description").trim().allow(null),
	sku: Joi.string().label("SKU Code").trim().allow(null).allow(""),
	unit_of_measure: Joi.string()
		.label("Unit of Measure")
		.trim()
		.allow(null)
		.allow(""),
	brand_id: Joi.number().label("Brand").allow(null),
	category_id: Joi.array().items(Joi.number()).required().label("Category"),
	attachments: Joi.array().label("Attachments").default([]),
	minimum_order_quantity: Joi.array()
		.label("Minimum Order Quantity")
		.default([]),
	price: Joi.array().label("Price").default([]),
	market_price: Joi.number().label("Market Price").allow(null).allow(""),
});
