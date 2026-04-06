import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "Category name is required",
        "any.required": "Category name is required",
    }),
});

export const updateCategorySchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "Category name is required",
        "any.required": "Category name is required",
    }),
});