import { Router } from "express";
import { healthCheckRoute } from "./healthRoute";
import noteRoutes from "./noteRoutes";
import categoryRoutes from "./categoryRoutes";
import tagRoutes from "./tagRoutes";

const router = Router();

router.use(healthCheckRoute);
router.use(categoryRoutes);
router.use(noteRoutes);
router.use(tagRoutes);

export default router;