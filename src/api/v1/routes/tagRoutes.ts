import express, { Router } from "express";
import {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
} from "../controllers/tagController";

const router: Router = express.Router();

router.get("/tags", getAllTags);
router.get("/tags/:id", getTagById);
router.post("/tags", createTag);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

export default router;