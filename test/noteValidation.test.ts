import { createNoteSchema, updateNoteSchema } from "../src/api/v1/validation/noteValidation";

describe("note validation", () => {
    it("should validate a correct note payload", () => {
        const payload = {
            title: "My Note",
            content: "This is note content",
            categoryId: "category-1",
            tagIds: ["tag-1"],
        };

        const { error } = createNoteSchema.validate(payload);
        expect(error).toBeUndefined();
    });

    it("should fail when title is missing", () => {
        const payload = {
            content: "This is note content",
            categoryId: "category-1",
            tagIds: ["tag-1"],
        };

        const { error } = createNoteSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should fail when content is missing", () => {
        const payload = {
            title: "My Note",
            categoryId: "category-1",
            tagIds: ["tag-1"],
        };

        const { error } = createNoteSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should fail when categoryId is missing", () => {
        const payload = {
            title: "My Note",
            content: "This is note content",
            tagIds: ["tag-1"],
        };

        const { error } = createNoteSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should fail when update payload is empty", () => {
        const { error } = updateNoteSchema.validate({});
        expect(error).toBeDefined();
    });
});