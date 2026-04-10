import { CreateTagInput, Tag, UpdateTagInput } from "../models/tagModel";
import * as tagRepository from "../repositories/tagRepository";

const generateTagId = (): string => {
    return `tag-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllTags = async (userId: string): Promise<Tag[]> => {
    return await tagRepository.getAllTags(userId);
};

export const getTagById = async (
    id: string,
    userId: string
): Promise<Tag | null> => {
    return await tagRepository.getTagById(id, userId);
};

export const createTag = async (
    userId: string,
    tagData: CreateTagInput
): Promise<Tag> => {
    if (!tagData.name || !tagData.name.trim()) {
        throw new Error("Tag name is required");
    }

    const newTag: Tag = {
        id: generateTagId(),
        userId,
        name: tagData.name.trim(),
    };

    return await tagRepository.createTag(newTag);
};

export const updateTag = async (
    id: string,
    userId: string,
    tagData: UpdateTagInput
): Promise<Tag | null> => {
    if (tagData.name !== undefined && !tagData.name.trim()) {
        throw new Error("Tag name is required");
    }

    const cleanedData: UpdateTagInput = {
        ...tagData,
        ...(tagData.name !== undefined ? { name: tagData.name.trim() } : {}),
    };

    return await tagRepository.updateTag(id, userId, cleanedData);
};

export const deleteTag = async (
    id: string,
    userId: string
): Promise<boolean> => {
    return await tagRepository.deleteTag(id, userId);
};