import request from "supertest";
import app from "../src/app";

describe("Tag API Endpoints", () => {
    let createdTagId: string;

    it("should create a tag", async () => {
        const response = await request(app).post("/api/v1/tags").send({
            name: "urgent",
        });

        createdTagId = response.body.data.id;

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Tag created successfully");
        expect(response.body.data.name).toBe("urgent");
    });

    it("should get all tags", async () => {
        const response = await request(app).get("/api/v1/tags");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Tags retrieved successfully");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should get a tag by id", async () => {
        const response = await request(app).get(`/api/v1/tags/${createdTagId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Tag retrieved successfully");
        expect(response.body.data.id).toBe(createdTagId);
    });

    it("should update a tag by id", async () => {
        const response = await request(app).put(`/api/v1/tags/${createdTagId}`).send({
            name: "important",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Tag updated successfully");
        expect(response.body.data.name).toBe("important");
    });

    it("should delete a tag by id", async () => {
        const response = await request(app).delete(`/api/v1/tags/${createdTagId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Tag deleted successfully");
    });

    it("should return 400 when creating a tag without a name", async () => {
        const response = await request(app).post("/api/v1/tags").send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Tag name is required");
    });

    it("should return 404 when getting a tag that does not exist", async () => {
        const response = await request(app).get("/api/v1/tags/tag-does-not-exist");

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Tag not found");
    });
});