jest.mock("../src/api/v1/repositories/noteRepository", () => ({
    createNote: jest.fn((note) => Promise.resolve(note)),
    getAllNotes: jest.fn().mockResolvedValue([
        {
            id: "note-1",
            userId: "user-123",
            title: "Seed Note",
            content: "content",
            categoryId: "category-1",
            tagIds: [],
        },
    ]),
    getNoteById: jest.fn((id) => {
        if (id === "note-does-not-exist") {
            return Promise.resolve(null);
        }

        return Promise.resolve({
            id,
            userId: "user-123",
            title: "Test Note",
            content: "Test Content",
            categoryId: "category-1",
            tagIds: [],
        });
    }),
    updateNote: jest.fn((id, userId, noteData) =>
        Promise.resolve({
            id,
            userId,
            title: noteData.title ?? "Test Note",
            content: noteData.content ?? "Test Content",
            categoryId: noteData.categoryId ?? "category-1",
            tagIds: noteData.tagIds ?? [],
        })
    ),
    deleteNote: jest.fn().mockResolvedValue(true),
}));

import * as noteService from "../src/api/v1/services/noteService";

describe("note service", () => {
    const userId = "user-123";

    it("should create a note", async () => {
        const result = await noteService.createNote(userId, {
            title: "My Note",
            content: "content",
            categoryId: "category-1",
            tagIds: ["tag-1"],
        });

        expect(result).toMatchObject({
            title: "My Note",
            content: "content",
            categoryId: "category-1",
            tagIds: ["tag-1"],
        });

        expect(result.id).toBeDefined();
    });

    it("should get all notes", async () => {
        const result = await noteService.getAllNotes(userId);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    it("should get a note by id", async () => {
        const result = await noteService.getNoteById("note-1", userId);

        expect(result).toEqual(
            expect.objectContaining({
                id: "note-1",
                userId,
            })
        );
    });

    it("should update a note", async () => {
        const updated = await noteService.updateNote("note-1", userId, {
            title: "Updated Title",
        });

        expect(updated).toBeDefined();
        expect(updated?.title).toBe("Updated Title");
    });

    it("should delete a note", async () => {
        const deleted = await noteService.deleteNote("note-1", userId);

        expect(deleted).toBe(true);
    });
});