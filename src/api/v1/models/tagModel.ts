export interface Tag {
    id: string;
    name: string;
    userId: string;
}

export interface CreateTagInput {
    name: string;
}

export interface UpdateTagInput {
    name?: string;
}