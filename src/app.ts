import express, { Express } from "express";
import { healthCheckRoute } from "./api/v1/routes/healthRoute";

const app: Express = express();

app.use(express.json());

// Add health check endpoint
app.use("/api/v1", healthCheckRoute);

export default app;