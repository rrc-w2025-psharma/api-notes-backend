import express, { Router } from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController";
import authenticate from "../middleware/authenticate";
import validate from "../middleware/validate";
import {
    createCategorySchema,
    updateCategorySchema,
} from ".././validation/categoryValidation";

const router: Router = express.Router();

router.get("/", authenticate, getAllCategories);
router.get("/:id", authenticate, getCategoryById);
router.post(
    "/",
    authenticate,
    createCategory
);
router.put(
    "/:id",
    authenticate,
    validate(updateCategorySchema),
    updateCategory
);
router.delete("/:id", authenticate, deleteCategory);

export default router;