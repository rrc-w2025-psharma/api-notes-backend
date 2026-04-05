import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as noteService from "../services/noteService";
import { CreateNoteInput, UpdateNoteInput } from "../models/noteModel";

export const getAllNotes = (req: Request, res: Response): void => {
    try {
        const notes = noteService.getAllNotes();

        res.status(HTTP_STATUS.OK).json({
            message: "Notes retrieved successfully",
            data: notes,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve notes",
        });
    }
};

export const getNoteById = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const note = noteService.getNoteById(id);

        if (!note) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Note not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Note retrieved successfully",
            data: note,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve note",
        });
    }
};

export const createNote = (req: Request, res: Response): void => {
    try {
        const { title, content, categoryId, tagIds }: CreateNoteInput = req.body;

        if (!title || !content || !categoryId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Title, content, and categoryId are required",
            });
            return;
        }

        const newNote = noteService.createNote({
            title,
            content,
            categoryId,
            tagIds,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Note created successfully",
            data: newNote,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create note",
        });
    }
};

export const updateNote = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const { title, content, categoryId, tagIds }: UpdateNoteInput = req.body;

        if (!title && !content && !categoryId && !tagIds) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "At least one field is required to update the note",
            });
            return;
        }

        const updatedNote = noteService.updateNote(id, {
            title,
            content,
            categoryId,
            tagIds,
        });

        if (!updatedNote) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Note not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Note updated successfully",
            data: updatedNote,
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update note",
        });
    }
};

export const deleteNote = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const deleted = noteService.deleteNote(id);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Note not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Note deleted successfully",
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete note",
        });
    }
};