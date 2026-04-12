import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import { healthCheckRoute } from "./api/v1/routes/healthRoute";
import noteRoutes from "./api/v1/routes/noteRoutes";
import categoryRoutes from "./api/v1/routes/categoryRoutes";
import tagRoutes from "./api/v1/routes/tagRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app: Express = express();

// Setup Swagger
setupSwagger(app);

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", healthCheckRoute);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);

export default app;