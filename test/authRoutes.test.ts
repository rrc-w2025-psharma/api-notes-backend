import request from "supertest";
import app from "../src/app";
import admin from "firebase-admin";

jest.mock("firebase-admin", () => ({
    auth: jest.fn(),
}));

describe("Authentication and Authorization Routes", () => {
    const mockVerifyIdToken = jest.fn();
    const mockSetCustomUserClaims = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (admin.auth as jest.Mock).mockReturnValue({
            verifyIdToken: mockVerifyIdToken,
            setCustomUserClaims: mockSetCustomUserClaims,
        });
    });

    it("should return 401 when no token is provided for profile route", async () => {
        const response = await request(app).get("/api/v1/users/profile");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Authorization token is required");
    });

    it("should return user profile when token is valid", async () => {
        mockVerifyIdToken.mockResolvedValue({
            uid: "user-123",
            email: "user@example.com",
            role: "user",
        });

        const response = await request(app)
            .get("/api/v1/users/profile")
            .set("Authorization", "Bearer valid-token");

        expect(response.status).toBe(200);
        expect(response.body.data.uid).toBe("user-123");
        expect(response.body.data.role).toBe("user");
    });

    it("should return 401 when token is invalid", async () => {
        mockVerifyIdToken.mockRejectedValue(new Error("Invalid token"));

        const response = await request(app)
            .get("/api/v1/users/profile")
            .set("Authorization", "Bearer bad-token");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid or expired token");
    });

    it("should return 403 when non-admin tries to set role", async () => {
        mockVerifyIdToken.mockResolvedValue({
            uid: "user-123",
            email: "user@example.com",
            role: "user",
        });

        const response = await request(app)
            .post("/api/v1/admin/set-role")
            .set("Authorization", "Bearer valid-token")
            .send({
                uid: "target-user",
                role: "admin",
            });

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Forbidden");
    });

    it("should allow admin to set user role", async () => {
        mockVerifyIdToken.mockResolvedValue({
            uid: "admin-123",
            email: "admin@example.com",
            role: "admin",
        });

        mockSetCustomUserClaims.mockResolvedValue(undefined);

        const response = await request(app)
            .post("/api/v1/admin/set-role")
            .set("Authorization", "Bearer valid-token")
            .send({
                uid: "target-user",
                role: "admin",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User role updated successfully");
        expect(mockSetCustomUserClaims).toHaveBeenCalledWith("target-user", {
            role: "admin",
        });
    });
});