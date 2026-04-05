import * as noteService from "../src/api/v1/services/noteService";

describe("note service", () => {
    it("should create a note", () => {
        const result = noteService.createNote({
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

    it("should get all notes", () => {
        // ensure at least one note exists
        noteService.createNote({
            title: "Seed Note",
            content: "content",
            categoryId: "category-1",
            tagIds: [],
        });

        const result = noteService.getAllNotes();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    it("should get a note by id", () => {
        const created = noteService.createNote({
            title: "Find Me",
            content: "content",
            categoryId: "category-1",
            tagIds: [],
        });

        const result = noteService.getNoteById(created.id);

        expect(result).toEqual(created);
    });

    it("should update a note", () => {
        const created = noteService.createNote({
            title: "Old Title",
            content: "content",
            categoryId: "category-1",
            tagIds: [],
        });

        const updated = noteService.updateNote(created.id, {
            title: "Updated Title",
        });

        expect(updated).toBeDefined();
        expect(updated?.title).toBe("Updated Title");
    });

    it("should delete a note", () => {
        const created = noteService.createNote({
            title: "Delete Me",
            content: "content",
            categoryId: "category-1",
            tagIds: [],
        });

        const deleted = noteService.deleteNote(created.id);

        expect(deleted).toBe(true);

        const result = noteService.getNoteById(created.id);
        expect(result).toBeUndefined();
    });
});