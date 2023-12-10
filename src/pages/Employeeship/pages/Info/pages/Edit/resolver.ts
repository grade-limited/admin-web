import Joi from "joi";

export const employeeshipUpdateResolver = Joi.object({
  employeeship_status: Joi.string().required().label("Status"),
  organization_id: Joi.number().required().label("Organization"),
  user_id: Joi.number().required().label("User"),
  employee_id: Joi.string().required().label("Employee ID"),
  depertment: Joi.string().required().label("Department").trim(),
  designation: Joi.string().required().label("Designation").trim(),
  branch: Joi.string().required().label("Branch").trim(),
  desk_info: Joi.string().label("Desk Ibnfo").trim().allow("").allow(null),
  business_unit: Joi.string()
    .label("Business Unit")
    .trim()
    .allow("")
    .allow(null),
});
