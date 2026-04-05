import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as categoryService from "../services/categoryService";
import {
    CreateCategoryInput,
    UpdateCategoryInput,
} from "../models/categoryModel";

export const getAllCategories = (req: Request, res: Response): void => {
    try {
        const categories = categoryService.getAllCategories();

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

export const getCategoryById = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const category = categoryService.getCategoryById(id);

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

export const createCategory = (req: Request, res: Response): void => {
    try {
        const { name }: CreateCategoryInput = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Category name is required",
            });
            return;
        }

        const newCategory = categoryService.createCategory({ name });

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

export const updateCategory = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const { name }: UpdateCategoryInput = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Category name is required",
            });
            return;
        }

        const updatedCategory = categoryService.updateCategory(id, { name });

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

export const deleteCategory = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const deleted = categoryService.deleteCategory(id);

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