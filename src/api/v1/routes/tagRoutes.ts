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

router.get("/", authenticate,  getAllTags);
router.get("/:id", authenticate, getTagById);
router.post("/", authenticate, createTag);
router.put("/:id", authenticate, validate(updateTagSchema), updateTag);
router.delete("/:id", authenticate, deleteTag);

export default router;