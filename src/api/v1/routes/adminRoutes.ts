import express, { Router } from "express";
import { setUserRole } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router: Router = express.Router();

router.post(
    "/admin/set-role",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    setUserRole
);

export default router;