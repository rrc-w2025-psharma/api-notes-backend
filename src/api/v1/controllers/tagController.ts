import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as tagService from "../services/tagService";
import { CreateTagInput, UpdateTagInput } from "../models/tagModel";

export const getAllTags = (req: Request, res: Response): void => {
    try {
        const tags = tagService.getAllTags(res.locals.uid);

        res.status(HTTP_STATUS.OK).json({
            message: "Tags retrieved successfully",
            data: tags,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve tags",
        });
    }
};

export const getTagById = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const tag = tagService.getTagById(id, res.locals.uid);

        if (!tag) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Tag not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Tag retrieved successfully",
            data: tag,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve tag",
        });
    }
};

export const createTag = (req: Request, res: Response): void => {
    try {
        const { name }: CreateTagInput = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Tag name is required",
            });
            return;
        }

        const newTag = tagService.createTag({ name, userId: res.locals.uid });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Tag created successfully",
            data: newTag,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create tag",
        });
    }
};

export const updateTag = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const { name }: UpdateTagInput = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Tag name is required",
            });
            return;
        }

        const updatedTag = tagService.updateTag(id, res.locals.uid, { name });

        if (!updatedTag) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Tag not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Tag updated successfully",
            data: updatedTag,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update tag",
        });
    }
};

export const deleteTag = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const deleted = tagService.deleteTag(id, res.locals.uid);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Tag not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Tag deleted successfully",
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete tag",
        });
    }
};