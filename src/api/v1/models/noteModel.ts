export interface Note {
    id: string;
    userId: string;
    title: string;
    content: string;
    categoryId: string;
    tagIds: string[];
    createdAt: string;
    updatedAt: string;
}