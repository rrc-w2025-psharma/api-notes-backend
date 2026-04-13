import express = require("express");
import {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController";
import authenticate from "../middleware/authenticate";
import validate from "../middleware/validate";
import {
    createNoteSchema,
    updateNoteSchema,
} from "../validation/noteValidation";

const router: express.Router = express.Router();

/**
 * @openapi
 * /notes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Notes retrieved successfully
 */

router.get("/", authenticate, getAllNotes);


/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 * 
 */

router.get("/:id", authenticate, getNoteById);

/**
 * @openapi
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Note created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post("/", authenticate, validate(createNoteSchema), createNote);


/**
 * @openapi
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */

router.put("/:id", authenticate, validate(updateNoteSchema), updateNote);


/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */

router.delete("/:id", authenticate, deleteNote);

export default router;