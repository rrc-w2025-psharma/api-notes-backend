import express = require("express");
import { getProfile } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router: express.Router = express.Router();

/**
 * @openapi
 * /users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 */

router.get("/users/profile", authenticate, getProfile);

export default router;