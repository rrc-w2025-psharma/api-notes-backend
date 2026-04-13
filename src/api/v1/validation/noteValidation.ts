import Joi = require("joi");

export const createNoteSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    content: Joi.string().trim().min(1).max(5000).required(),
    categoryId: Joi.string().trim().required(),
    tagIds: Joi.array().items(Joi.string().trim()).default([]),
});

export const updateNoteSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100),
    content: Joi.string().trim().min(1).max(5000),
    categoryId: Joi.string().trim(),
    tagIds: Joi.array().items(Joi.string().trim()),
}).min(1);