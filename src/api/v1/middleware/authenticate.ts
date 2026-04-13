// External library imports
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

// Internal module imports
import { getFirebaseAuth } from "../../../../config/firebaseConfig";

/**
 * Middleware to authenticate a user using a Firebase ID token.
 * Now integrated with centralized error handling system.
 *
 * This middleware:
 * - Extracts the token from the Authorization header
 * - Verifies the token with Firebase Auth
 * - Stores user information in res.locals for downstream middleware
 * - Throws standardized AuthenticationError for any failures
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token: string | undefined = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : undefined;

        if (!token) {
            throw new AuthenticationError(
                "Authorization token is required",
                "TOKEN_NOT_FOUND"
            );
        }

        if (process.env.NODE_ENV === "test") {
            if (token === "fake-token") {
                res.locals.uid = "user-123";
                res.locals.email = "user@example.com";
                res.locals.role = "user";
                return next();
            }

            if (token === "admin-token") {
                res.locals.uid = "admin-123";
                res.locals.email = "admin@example.com";
                res.locals.role = "admin";
                return next();
            }
        }

        const auth = getFirebaseAuth();
        const decodedToken: DecodedIdToken = await auth.verifyIdToken(
            token
        );
        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;
        next();
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            next(error);
        } else if (error instanceof Error) {
            const message = /invalid|expired|decode/i.test(error.message)
                ? "Invalid or expired token"
                : getErrorMessage(error);

            next(
                new AuthenticationError(
                    message,
                    message === "Invalid or expired token"
                        ? "TOKEN_INVALID"
                        : getErrorCode(error)
                )
            );
        } else {
            next(
                new AuthenticationError(
                    "Invalid or expired token",
                    "TOKEN_INVALID"
                )
            );
        }
    }
};

export default authenticate;