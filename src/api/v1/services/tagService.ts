import { CreateTagInput, Tag, UpdateTagInput } from "../models/tagModel";

const tags: Tag[] = [];

const generateTagId = (): string => {
    return `tag-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllTags = (userId: string): Tag[] => {
    return structuredClone(tags.filter(tag => tag.userId === userId));
};

export const getTagById = (id: string, userId: string): Tag | undefined => {
    return tags.find((tag: Tag) => tag.id === id && tag.userId === userId);
};

export const createTag = (tagData: CreateTagInput & { userId: string }): Tag => {
    const newTag: Tag = {
        id: generateTagId(),
        name: tagData.name,
        userId: tagData.userId,
    };

    tags.push(newTag);
    return structuredClone(newTag);
};

export const updateTag = (
    id: string,
    userId: string,
    tagData: UpdateTagInput
): Tag | undefined => {
    const tagIndex: number = tags.findIndex((tag: Tag) => tag.id === id && tag.userId === userId);

    if (tagIndex === -1) {
        return undefined;
    }

    tags[tagIndex] = {
        ...tags[tagIndex],
        ...tagData,
    };

    return structuredClone(tags[tagIndex]);
};

export const deleteTag = (id: string, userId: string): boolean => {
    const tagIndex: number = tags.findIndex((tag: Tag) => tag.id === id && tag.userId === userId);

    if (tagIndex === -1) {
        return false;
    }

    tags.splice(tagIndex, 1);
    return true;
};