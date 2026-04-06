import { getDb } from "../../../../config/firebaseConfig";
import { Note } from "../models/noteModel";

const db = getDb();
const COLLECTION_NAME = "notes";

export const createNote = async (note: Note): Promise<Note> => {
    await db.collection(COLLECTION_NAME).doc(note.id).set(note);
    return note;
};

export const getAllNotes = async (userId: string): Promise<Note[]> => {
    const snapshot = await db
        .collection(COLLECTION_NAME)
        .where("userId", "==", userId)
        .get();

    return snapshot.docs.map((doc) => doc.data() as Note);
};

export const getNoteById = async (
    id: string,
    userId: string
): Promise<Note | null> => {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    const note = doc.data() as Note;

    if (note.userId !== userId) {
        return null;
    }

    return note;
};

export const updateNote = async (
    id: string,
    userId: string,
    noteData: Partial<Note>
): Promise<Note | null> => {
    const noteRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await noteRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    const existingNote = existingDoc.data() as Note;

    if (existingNote.userId !== userId) {
        return null;
    }

    await noteRef.update(noteData);

    const updatedDoc = await noteRef.get();
    return updatedDoc.data() as Note;
};

export const deleteNote = async (
    id: string,
    userId: string
): Promise<boolean> => {
    const noteRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await noteRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    const existingNote = existingDoc.data() as Note;

    if (existingNote.userId !== userId) {
        return false;
    }

    await noteRef.delete();
    return true;
};