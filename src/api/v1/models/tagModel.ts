export interface Tag {
    id: string;
    name: string;
}

export interface CreateTagInput {
    name: string;
}

export interface UpdateTagInput {
    name?: string;
}