import express, { Router } from "express";
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

const router: Router = express.Router();

router.get("/", authenticate, getAllNotes);
router.get("/:id", authenticate, getNoteById);
router.post("/", authenticate, createNote);
router.put("/:id", authenticate, validate(updateNoteSchema), updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;