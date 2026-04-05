import { Router } from "express";

/**
 * Represents what the API returns when checking system health.
 * This is mainly used to confirm the server is running properly.
 */

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

export const healthCheckRoute: Router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check if the API is running
 *     description: Simple endpoint to verify the server is up and responding
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 120.5
 *                 timestamp:
 *                   type: string
 *                   example: 2026-03-28T18:45:00.000Z
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
healthCheckRoute.get("/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});
