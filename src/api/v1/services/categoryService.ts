import {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from "../models/categoryModel";

const categories: Category[] = [];

const generateCategoryId = (): string => {
    return `category-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllCategories = (): Category[] => {
    return structuredClone(categories);
};

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find((category: Category) => category.id === id);
};

export const createCategory = (
    categoryData: CreateCategoryInput
): Category => {
    const newCategory: Category = {
        id: generateCategoryId(),
        name: categoryData.name,
    };

    categories.push(newCategory);
    return structuredClone(newCategory);
};

export const updateCategory = (
    id: string,
    categoryData: UpdateCategoryInput
): Category | undefined => {
    const categoryIndex: number = categories.findIndex(
        (category: Category) => category.id === id
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

export const deleteCategory = (id: string): boolean => {
    const categoryIndex: number = categories.findIndex(
        (category: Category) => category.id === id
    );

    if (categoryIndex === -1) {
        return false;
    }

    categories.splice(categoryIndex, 1);
    return true;
};