export interface Category {
    id: string;
    name: string;
    userId: string;
}

export interface CreateCategoryInput {
    name: string;
}

export interface UpdateCategoryInput {
    name?: string;
}