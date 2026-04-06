import Joi from "joi";

export const createNoteSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.string().required(),
    tagIds: Joi.array().items(Joi.string()).optional(),
});

export const updateNoteSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    tagIds: Joi.array().items(Joi.string()).optional(),
});