import { getDb } from "../../../../config/firebaseConfig";
import { Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Tag } from "../models/tagModel";

const db = getDb();
const COLLECTION_NAME = "tags";

export const createTag = async (tag: Tag): Promise<Tag> => {
    if (!db) throw new Error("Firebase not configured");
    await db.collection(COLLECTION_NAME).doc(tag.id).set(tag);
    return tag;
};

export const getAllTags = async (userId: string): Promise<Tag[]> => {
    if (!db) throw new Error("Firebase not configured");
    const snapshot = await db
        .collection(COLLECTION_NAME)
        .where("userId", "==", userId)
        .get();

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Tag);
};

export const getTagById = async (
    id: string,
    userId: string
): Promise<Tag | null> => {
    if (!db) throw new Error("Firebase not configured");
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    const tag = doc.data() as Tag;

    if (tag.userId !== userId) {
        return null;
    }

    return tag;
};

export const updateTag = async (
    id: string,
    userId: string,
    tagData: Partial<Tag>
): Promise<Tag | null> => {
    if (!db) throw new Error("Firebase not configured");
    const tagRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await tagRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    const existingTag = existingDoc.data() as Tag;

    if (existingTag.userId !== userId) {
        return null;
    }

    await tagRef.update(tagData);

    const updatedDoc = await tagRef.get();
    return updatedDoc.data() as Tag;
};

export const deleteTag = async (
    id: string,
    userId: string
): Promise<boolean> => {
    if (!db) throw new Error("Firebase not configured");
    const tagRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await tagRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    const existingTag = existingDoc.data() as Tag;

    if (existingTag.userId !== userId) {
        return false;
    }

    await tagRef.delete();
    return true;
};