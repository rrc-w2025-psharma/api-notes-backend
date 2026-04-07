import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Handles setting custom roles for a user.
 * This allows administrators to assign or modify user roles.
 *
 * Note: After setting custom roles, the user must obtain a new
 * token for the changes to take effect.
 *
 * @param {Request} req - The request object containing uid and claims.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */

export const setUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid, role }: { uid?: string; role?: string } = req.body;

    if (!uid || !role) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "uid and role are required",
        });
        return;
    }

    try {
        await auth.setCustomUserClaims(uid, { role });

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                { uid, role },
                `Role set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    } catch (error) {
        next(error);
    }
};