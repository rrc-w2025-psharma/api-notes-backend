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

router.get("/notes", authenticate, getAllNotes);
router.get("/notes/:id", authenticate, getNoteById);
router.post("/notes", authenticate, validate(createNoteSchema), createNote);
router.put("/notes/:id", authenticate, validate(updateNoteSchema), updateNote);
router.delete("/notes/:id", authenticate, deleteNote);

export default router;