import Joi = require("joi");

export const createTagSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "any.required": "Tag name is required",
        "string.empty": "Tag name is required",
    }),
});

export const updateTagSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "any.required": "Tag name is required",
        "string.empty": "Tag name is required",
    }),
});``