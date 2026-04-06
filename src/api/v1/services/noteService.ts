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
    const newNote: Note = {
        id: generateNoteId(),
        userId,
        title: noteData.title,
        content: noteData.content,
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
    return await noteRepository.updateNote(id, userId, noteData);
};

export const deleteNote = async (
    id: string,
    userId: string
): Promise<boolean> => {
    return await noteRepository.deleteNote(id, userId);
};