import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getProfile = (req: Request, res: Response): void => {
    if (!req.user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Unauthorized",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "User profile retrieved successfully",
        data: {
            uid: req.user.uid,
            email: req.user.email ?? null,
            role: req.user.role ?? "user",
        },
    });
};