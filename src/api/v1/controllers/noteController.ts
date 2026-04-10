import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as noteService from "../services/noteService";
import { CreateNoteInput, UpdateNoteInput } from "../models/noteModel";

export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const notes = await noteService.getAllNotes(userId);

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

export const getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const note = await noteService.getNoteById(id, userId);

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

export const createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { title, content, categoryId, tagIds }: CreateNoteInput = req.body;

        const newNote = await noteService.createNote(userId, {
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

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const { title, content, categoryId, tagIds }: UpdateNoteInput = req.body;

        const updatedNote = await noteService.updateNote(id, userId, {
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

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = res.locals.uid;

        if (!userId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }

        const { id } = req.params;
        const deleted = await noteService.deleteNote(id, userId);

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