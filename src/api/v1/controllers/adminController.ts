import { Request, Response } from "express";
import admin from "firebase-admin";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const setUserRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid, role }: { uid?: string; role?: string } = req.body;

        if (!uid || !role) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "uid and role are required",
            });
            return;
        }

        await admin.auth().setCustomUserClaims(uid, { role });

        res.status(HTTP_STATUS.OK).json({
            message: "User role updated successfully",
            data: {
                uid,
                role,
            },
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update user role",
        });
    }
};