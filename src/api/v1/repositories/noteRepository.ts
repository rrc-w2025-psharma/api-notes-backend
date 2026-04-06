import { db } from "../../../../config/firebaseConfig";
import { Note } from "../models/noteModel";

const COLLECTION_NAME = "notes";

export const createNote = async (note: Note): Promise<Note> => {
    await db.collection(COLLECTION_NAME).doc(note.id).set(note);
    return note;
};

export const getAllNotes = async (): Promise<Note[]> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => doc.data() as Note);
};

export const getNoteById = async (id: string): Promise<Note | null> => {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Note;
};

export const updateNote = async (
    id: string,
    noteData: Partial<Note>
): Promise<Note | null> => {
    const noteRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await noteRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    await noteRef.update(noteData);

    const updatedDoc = await noteRef.get();
    return updatedDoc.data() as Note;
};

export const deleteNote = async (id: string): Promise<boolean> => {
    const noteRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await noteRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    await noteRef.delete();
    return true;
};