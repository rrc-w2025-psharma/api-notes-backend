import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/services/noteService", () => ({
    getAllNotes: jest.fn().mockResolvedValue([]),
    getNoteById: jest.fn((id) => {
        if (id === "note-does-not-exist") return null;
        return Promise.resolve({
            id,
            title: "Test Note",
            content: "Test Content",
        });
    }),
    createNote: jest.fn().mockResolvedValue({
        id: "test-id",
        title: "Test Note",
        content: "Test Content",
    }),
    updateNote: jest.fn().mockResolvedValue({
        id: "test-id",
        title: "Updated Note Title",
    }),
    deleteNote: jest.fn().mockResolvedValue(true),
}));

describe("Note API Endpoints", () => {
    let createdNoteId: string;

    it("should create a note", async () => {
        const response = await request(app)
            .post("/api/v1/notes")
            .set('Authorization', 'Bearer fake-token')
            .send({
                title: "Test Note",
                content: "This is a test note",
                categoryId: "category-1",
                tagIds: ["tag-1"],
            });

        createdNoteId = response.body.data.id;

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Note created successfully");
        expect(response.body.data.title).toBe("Test Note");
    });

    it("should get all notes", async () => {
        const response = await request(app)
            .get("/api/v1/notes")
            .set('Authorization', 'Bearer fake-token');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Notes retrieved successfully");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should get a note by id", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${createdNoteId}`)
            .set('Authorization', 'Bearer fake-token');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Note retrieved successfully");
        expect(response.body.data.id).toBe(createdNoteId);
    });

    it("should update a note by id", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${createdNoteId}`)
            .set('Authorization', 'Bearer fake-token')
            .send({
                title: "Updated Note Title",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Note updated successfully");
        expect(response.body.data.title).toBe("Updated Note Title");
    });

    it("should delete a note by id", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${createdNoteId}`)
            .set('Authorization', 'Bearer fake-token');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Note deleted successfully");
    });

    it("should return 400 when creating a note with missing required fields", async () => {
        const response = await request(app)
            .post("/api/v1/notes")
            .set('Authorization', 'Bearer fake-token')
            .send({
                title: "",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            "Title, content, and categoryId are required"
        );
    });

    it("should return 404 when getting a note that does not exist", async () => {
        const response = await request(app)
            .get("/api/v1/notes/note-does-not-exist")
            .set('Authorization', 'Bearer fake-token');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Note not found");
    });
});