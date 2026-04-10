import {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from "../models/categoryModel";
import * as categoryRepository from "../repositories/categoryRepository";

const generateCategoryId = (): string => {
    return `category-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllCategories = async (userId: string): Promise<Category[]> => {
    return await categoryRepository.getAllCategories(userId);
};

export const getCategoryById = async (
    id: string,
    userId: string
): Promise<Category | null> => {
    return await categoryRepository.getCategoryById(id, userId);
};

export const createCategory = async (
    userId: string,
    categoryData: CreateCategoryInput
): Promise<Category> => {
    if (!categoryData.name || !categoryData.name.trim()) {
        throw new Error("Category name is required");
    }

    const newCategory: Category = {
        id: generateCategoryId(),
        userId,
        name: categoryData.name.trim(),
    };

    return await categoryRepository.createCategory(newCategory);
};

export const updateCategory = async (
    id: string,
    userId: string,
    categoryData: UpdateCategoryInput
): Promise<Category | null> => {
    if (categoryData.name !== undefined && !categoryData.name.trim()) {
        throw new Error("Category name is required");
    }

    const cleanedData: UpdateCategoryInput = {
        ...categoryData,
        ...(categoryData.name !== undefined
            ? { name: categoryData.name.trim() }
            : {}),
    };

    return await categoryRepository.updateCategory(id, userId, cleanedData);
};

export const deleteCategory = async (
    id: string,
    userId: string
): Promise<boolean> => {
    return await categoryRepository.deleteCategory(id, userId);
};