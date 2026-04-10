import express, { Router } from "express";
import { getProfile } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router: Router = express.Router();

router.get("/users/profile", authenticate, getProfile);

export default router;