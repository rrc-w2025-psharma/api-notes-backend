import { CreateNoteInput, Note, UpdateNoteInput } from "../models/noteModel";
import * as noteRepository from "../repositories/noteRepository";

const generateNoteId = (): string => {
    return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllNotes = async (userId: string): Promise<Note[]> => {
    return await noteRepository.getAllNotes(userId);
};

export const getNoteById = async (
    id: string,
    userId: string
): Promise<Note | null> => {
    return await noteRepository.getNoteById(id, userId);
};

export const createNote = async (
    userId: string,
    noteData: CreateNoteInput
): Promise<Note> => {

    if (
        !noteData.title ||
        !noteData.title.trim() ||
        !noteData.content ||
        !noteData.content.trim() ||
        !noteData.categoryId
    ) {
        throw new Error("Title, content, and categoryId are required");
    }

    const newNote: Note = {
        id: generateNoteId(),
        userId,
        title: noteData.title.trim(),
        content: noteData.content.trim(),
        categoryId: noteData.categoryId,
        tagIds: noteData.tagIds ?? [],
    };

    return await noteRepository.createNote(newNote);
};

export const updateNote = async (
    id: string,
    userId: string,
    noteData: UpdateNoteInput
): Promise<Note | null> => {
    if (noteData.title !== undefined && !noteData.title.trim()) {
        throw new Error("Title cannot be empty");
    }

    if (noteData.content !== undefined && !noteData.content.trim()) {
        throw new Error("Content cannot be empty");
    }

    const cleanedData: UpdateNoteInput = {
        ...noteData,
        ...(noteData.title !== undefined ? { title: noteData.title.trim() } : {}),
        ...(noteData.content !== undefined ? { content: noteData.content.trim() } : {}),
    };

    return await noteRepository.updateNote(id, userId, cleanedData);
};

export const deleteNote = async (
    id: string,
    userId: string
): Promise<boolean> => {
    return await noteRepository.deleteNote(id, userId);
};