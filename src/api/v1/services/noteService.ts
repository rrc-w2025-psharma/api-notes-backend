import { CreateNoteInput, Note, UpdateNoteInput } from "../models/noteModel";

const notes: Note[] = [];

const generateNoteId = (): string => {
    return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

export const getAllNotes = (): Note[] => {
    return structuredClone(notes);
};

export const getNoteById = (id: string): Note | undefined => {
    return notes.find((note: Note) => note.id === id);
};

export const createNote = (noteData: CreateNoteInput): Note => {
    const newNote: Note = {
        id: generateNoteId(),
        title: noteData.title,
        content: noteData.content,
        categoryId: noteData.categoryId,
        tagIds: noteData.tagIds ?? [],
    };

    notes.push(newNote);
    return structuredClone(newNote);
};

export const updateNote = (
    id: string,
    noteData: UpdateNoteInput
): Note | undefined => {
    const noteIndex: number = notes.findIndex((note: Note) => note.id === id);

    if (noteIndex === -1) {
        return undefined;
    }

    notes[noteIndex] = {
        ...notes[noteIndex],
        ...noteData,
    };

    return structuredClone(notes[noteIndex]);
};

export const deleteNote = (id: string): boolean => {
    const noteIndex: number = notes.findIndex((note: Note) => note.id === id);

    if (noteIndex === -1) {
        return false;
    }

    notes.splice(noteIndex, 1);
    return true;
};