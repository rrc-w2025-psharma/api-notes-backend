import express, { Router } from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController";

const router: Router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;