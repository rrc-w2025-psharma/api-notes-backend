import Joi from "joi";

export const createNoteSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
    }),
    content: Joi.string().trim().min(1).max(5000).required().messages({
        "string.empty": "Content is required",
        "any.required": "Content is required",
    }),
    categoryId: Joi.string().trim().required().messages({
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
    }),
    tagIds: Joi.array().items(Joi.string().trim()).default([]),
});

export const updateNoteSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100),
    content: Joi.string().trim().min(1).max(5000),
    categoryId: Joi.string().trim(),
    tagIds: Joi.array().items(Joi.string().trim()),
}).min(1);