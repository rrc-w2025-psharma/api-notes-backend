import express = require("express");
import { setUserRole } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /admin/set-role:
 *   post:
 *     summary: Set a user's role using Firebase custom claims
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User role updated successfully
 *       '403':
 *         description: Forbidden
 */

router.post("/admin/set-role",authenticate,authorize({ hasRole: ["admin"] }),setUserRole);

export default router;