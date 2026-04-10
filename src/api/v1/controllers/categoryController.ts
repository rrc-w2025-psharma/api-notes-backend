import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as categoryService from "../services/categoryService";
import {
    CreateCategoryInput,
    UpdateCategoryInput,
} from "../models/categoryModel";

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const categories = await categoryService.getAllCategories(userId);

        res.status(HTTP_STATUS.OK).json({
            message: "Categories retrieved successfully",
            data: categories,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve categories",
        });
    }
};

export const getCategoryById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const category = await categoryService.getCategoryById(id, userId);

        if (!category) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Category not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Category retrieved successfully",
            data: category,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve category",
        });
    }
};

export const createCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { name }: CreateCategoryInput = req.body;

        const newCategory = await categoryService.createCategory(userId, { name });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create category",
        });
    }
};

export const updateCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const { name }: UpdateCategoryInput = req.body;

        const updatedCategory = await categoryService.updateCategory(id, userId, {
            name,
        });

        if (!updatedCategory) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Category not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update category",
        });
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const deleted = await categoryService.deleteCategory(id, userId);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Category not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Category deleted successfully",
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete category",
        });
    }
};