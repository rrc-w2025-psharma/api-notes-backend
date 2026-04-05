import { db } from "../../../../config/firebaseConfig";
import { Tag } from "../models/tagModel";

const COLLECTION_NAME = "tags";

export const createTag = async (tag: Tag): Promise<Tag> => {
    await db.collection(COLLECTION_NAME).doc(tag.id).set(tag);
    return tag;
};

export const getAllTags = async (): Promise<Tag[]> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => doc.data() as Tag);
};

export const getTagById = async (id: string): Promise<Tag | null> => {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Tag;
};

export const updateTag = async (
    id: string,
    tagData: Partial<Tag>
): Promise<Tag | null> => {
    const tagRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await tagRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    await tagRef.update(tagData);

    const updatedDoc = await tagRef.get();
    return updatedDoc.data() as Tag;
};

export const deleteTag = async (id: string): Promise<boolean> => {
    const tagRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await tagRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    await tagRef.delete();
    return true;
};