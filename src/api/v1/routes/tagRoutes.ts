import express, { Router } from "express";
import {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
} from "../controllers/tagController";

import authenticate from "../middleware/authenticate";
import validate from "../middleware/validate";
import { createTagSchema, updateTagSchema } from "../validation/tagValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tags
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllTags);

/**
 * @openapi
 * /tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag found
 *       404:
 *         description: Tag not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, getTagById);

/**
 * @openapi
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags:
 *       - Tags
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
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Tag created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, validate(createTagSchema), createTag);

/**
 * @openapi
 * /tags/{id}:
 *   put:
 *     summary: Update a tag
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag ID
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
 *     responses:
 *       200:
 *         description: Tag updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Tag not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticate, validate(updateTagSchema), updateTag);

/**
 * @openapi
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted
 *       404:
 *         description: Tag not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteTag);

export default router;