import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getProfile = (req: Request, res: Response): void => {
    const uid = res.locals.uid;
    const email = res.locals.email;
    const role = res.locals.role;

    if (!uid) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Unauthorized",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "User profile retrieved successfully",
        data: {
            uid,
            email: email ?? null,
            role: role ?? "user",
        },
    });
};