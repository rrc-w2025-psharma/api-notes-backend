export interface Note {
    id: string;
    title: string;
    content: string;
    categoryId: string;
    tagIds: string[];
    userId: string;
}

export interface CreateNoteInput {
    title: string;
    content: string;
    categoryId: string;
    tagIds?: string[];
}

export interface UpdateNoteInput {
    title?: string;
    content?: string;
    categoryId?: string;
    tagIds?: string[];
}