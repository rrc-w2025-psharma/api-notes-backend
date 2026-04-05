import request from "supertest";
import app from "../src/app";

describe("Category API Endpoints", () => {
    let createdCategoryId: string;

    it("should create a category", async () => {
        const response = await request(app).post("/api/v1/categories").send({
            name: "School",
        });

        createdCategoryId = response.body.data.id;

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Category created successfully");
        expect(response.body.data.name).toBe("School");
    });

    it("should get all categories", async () => {
        const response = await request(app).get("/api/v1/categories");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Categories retrieved successfully");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should get a category by id", async () => {
        const response = await request(app).get(
            `/api/v1/categories/${createdCategoryId}`
        );

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Category retrieved successfully");
        expect(response.body.data.id).toBe(createdCategoryId);
    });

    it("should update a category by id", async () => {
        const response = await request(app)
            .put(`/api/v1/categories/${createdCategoryId}`)
            .send({
                name: "Updated School",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Category updated successfully");
        expect(response.body.data.name).toBe("Updated School");
    });

    it("should delete a category by id", async () => {
        const response = await request(app).delete(
            `/api/v1/categories/${createdCategoryId}`
        );

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Category deleted successfully");
    });

    it("should return 400 when creating a category without a name", async () => {
        const response = await request(app).post("/api/v1/categories").send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category name is required");
    });

    it("should return 404 when getting a category that does not exist", async () => {
        const response = await request(app).get(
            "/api/v1/categories/category-does-not-exist"
        );

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Category not found");
    });
});