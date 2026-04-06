import Joi from "joi";

export const createTagSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "Tag name is required",
        "any.required": "Tag name is required",
    }),
});

export const updateTagSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "Tag name is required",
        "any.required": "Tag name is required",
    }),
});