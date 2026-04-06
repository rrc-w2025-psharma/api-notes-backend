import {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from "../models/categoryModel";

const categories: Category[] = [];

const generateCategoryId = (): string => {
    return `category-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllCategories = (userId: string): Category[] => {
    return structuredClone(categories.filter(category => category.userId === userId));
};

export const getCategoryById = (id: string, userId: string): Category | undefined => {
    return categories.find((category: Category) => category.id === id && category.userId === userId);
};

export const createCategory = (
    categoryData: CreateCategoryInput & { userId: string }
): Category => {
    const newCategory: Category = {
        id: generateCategoryId(),
        name: categoryData.name,
        userId: categoryData.userId,
    };

    categories.push(newCategory);
    return structuredClone(newCategory);
};

export const updateCategory = (
    id: string,
    userId: string,
    categoryData: UpdateCategoryInput
): Category | undefined => {
    const categoryIndex: number = categories.findIndex(
        (category: Category) => category.id === id && category.userId === userId
    );

    if (categoryIndex === -1) {
        return undefined;
    }

    categories[categoryIndex] = {
        ...categories[categoryIndex],
        ...categoryData,
    };

    return structuredClone(categories[categoryIndex]);
};

export const deleteCategory = (id: string, userId: string): boolean => {
    const categoryIndex: number = categories.findIndex(
        (category: Category) => category.id === id && category.userId === userId
    );

    if (categoryIndex === -1) {
        return false;
    }

    categories.splice(categoryIndex, 1);
    return true;
};