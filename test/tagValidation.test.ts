import {
    createTagSchema,
    updateTagSchema,
} from "../src/api/v1/validation/tagValidation";

describe("tag validation", () => {
    it("should validate a correct tag payload", () => {
        const payload = { name: "urgent" };
        const { error } = createTagSchema.validate(payload);
        expect(error).toBeUndefined();
    });

    it("should fail when name is missing", () => {
        const payload = {};
        const { error } = createTagSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should fail when name is empty", () => {
        const payload = { name: "" };
        const { error } = createTagSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should fail when name is too short", () => {
        const payload = { name: "a" };
        const { error } = createTagSchema.validate(payload);
        expect(error).toBeDefined();
    });

    it("should validate update payload with a correct name", () => {
        const payload = { name: "important" };
        const { error } = updateTagSchema.validate(payload);
        expect(error).toBeUndefined();
    });
});