import { getDb } from "../../../../config/firebaseConfig";
import { Tag } from "../models/tagModel";

const db = getDb();
const COLLECTION_NAME = "tags";

export const createTag = async (tag: Tag): Promise<Tag> => {
    await db.collection(COLLECTION_NAME).doc(tag.id).set(tag);
    return tag;
};

export const getAllTags = async (userId: string): Promise<Tag[]> => {
    const snapshot = await db
        .collection(COLLECTION_NAME)
        .where("userId", "==", userId)
        .get();

    return snapshot.docs.map((doc) => doc.data() as Tag);
};

export const getTagById = async (
    id: string,
    userId: string
): Promise<Tag | null> => {
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