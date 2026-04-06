import express, { Router } from "express";
import { setUserRole } from "../controllers/adminController";

const router: Router = express.Router();

router.post("/admin/set-role", setUserRole);

export default router;