import express, { Express } from "express";
import { healthCheckRoute } from "./api/v1/routes/healthRoute";
import noteRoutes from "./api/v1/routes/noteRoutes";
import categoryRoutes from "./api/v1/routes/categoryRoutes";
import tagRoutes from "./api/v1/routes/tagRoutes";

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", healthCheckRoute);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tags", tagRoutes);

export default app;