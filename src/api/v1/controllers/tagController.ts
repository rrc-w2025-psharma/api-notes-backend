import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as tagService from "../services/tagService";
import { CreateTagInput, UpdateTagInput } from "../models/tagModel";

export const getAllTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const tags = await tagService.getAllTags(userId);

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

export const getTagById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const tag = await tagService.getTagById(id, userId);

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

export const createTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { name }: CreateTagInput = req.body;

        const newTag = await tagService.createTag(userId, { name });

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

export const updateTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const { name }: UpdateTagInput = req.body;

        const updatedTag = await tagService.updateTag(id, userId, { name });

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

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const deleted = await tagService.deleteTag(id, userId);

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