import express = require("express");
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

const router: express.Router = express.Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, getCategoryById);

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, validate(createCategorySchema), createCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticate, validate(updateCategorySchema), updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteCategory);

export default router;