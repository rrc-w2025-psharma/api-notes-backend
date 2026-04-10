import { Router } from "express";
import { healthCheckRoute } from "./healthRoute";
import noteRoutes from "./noteRoutes";
import categoryRoutes from "./categoryRoutes";
import tagRoutes from "./tagRoutes";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

const router = Router();

router.use(healthCheckRoute);
router.use(categoryRoutes);
router.use(noteRoutes);
router.use(tagRoutes);
router.use(tagRoutes); 
router.use(userRoutes);
router.use(adminRoutes);

export default router;