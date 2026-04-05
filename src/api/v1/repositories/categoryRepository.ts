import { db } from "../../../../config/firebaseConfig";
import { Category } from "../models/categoryModel";

const COLLECTION_NAME = "categories";

export const createCategory = async (
    category: Category
): Promise<Category> => {
    await db.collection(COLLECTION_NAME).doc(category.id).set(category);
    return category;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => doc.data() as Category);
};

export const getCategoryById = async (
    id: string
): Promise<Category | null> => {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Category;
};

export const updateCategory = async (
    id: string,
    categoryData: Partial<Category>
): Promise<Category | null> => {
    const categoryRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await categoryRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    await categoryRef.update(categoryData);

    const updatedDoc = await categoryRef.get();
    return updatedDoc.data() as Category;
};

export const deleteCategory = async (id: string): Promise<boolean> => {
    const categoryRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await categoryRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    await categoryRef.delete();
    return true;
};