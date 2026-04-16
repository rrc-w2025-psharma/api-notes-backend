import { getDb } from "../../../../config/firebaseConfig";
import { Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Category } from "../models/categoryModel";

const db = getDb();
const COLLECTION_NAME = "categories";

export const createCategory = async (
    category: Category
): Promise<Category> => {
    if (!db) throw new Error("Firebase not configured");
    await db.collection(COLLECTION_NAME).doc(category.id).set(category);
    return category;
};

export const getAllCategories = async (userId: string): Promise<Category[]> => {
    if (!db) throw new Error("Firebase not configured");
    const snapshot = await db
        .collection(COLLECTION_NAME)
        .where("userId", "==", userId)
        .get();

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Category);
};

export const getCategoryById = async (
    id: string,
    userId: string
): Promise<Category | null> => {
    if (!db) throw new Error("Firebase not configured");
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    const category = doc.data() as Category;

    if (category.userId !== userId) {
        return null;
    }

    return category;
};

export const updateCategory = async (
    id: string,
    userId: string,
    categoryData: Partial<Category>
): Promise<Category | null> => {
    if (!db) throw new Error("Firebase not configured");
    const categoryRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await categoryRef.get();

    if (!existingDoc.exists) {
        return null;
    }

    const existingCategory = existingDoc.data() as Category;

    if (existingCategory.userId !== userId) {
        return null;
    }

    await categoryRef.update(categoryData);

    const updatedDoc = await categoryRef.get();
    return updatedDoc.data() as Category;
};

export const deleteCategory = async (
    id: string,
    userId: string
): Promise<boolean> => {
    if (!db) throw new Error("Firebase not configured");
    const categoryRef = db.collection(COLLECTION_NAME).doc(id);
    const existingDoc = await categoryRef.get();

    if (!existingDoc.exists) {
        return false;
    }

    const existingCategory = existingDoc.data() as Category;

    if (existingCategory.userId !== userId) {
        return false;
    }

    await categoryRef.delete();
    return true;
};