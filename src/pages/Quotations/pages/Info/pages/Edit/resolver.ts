import Joi from "joi";

export const qouUpdateResolver = Joi.object({
  status: Joi.string().required().label("Status"),
  expected_delivery_date: Joi.any()
    .label("Expected Delivery Date")
    .allow("")
    .allow(null),
  delivery_fee: Joi.number().label("Delivery Fee").allow("").allow(null),
  discount: Joi.number().label("Discount").allow("").allow(null),
});
