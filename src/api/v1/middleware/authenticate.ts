import { Request, Response, NextFunction } from "express";
import { getFirebaseAuth } from "../../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (process.env.NODE_ENV === "test") {
            res.locals.uid = "test-uid";
            res.locals.email = "test@example.com";
            res.locals.role = "user";
            return next();
        }

        const auth = getFirebaseAuth();
        const authHeader = req.headers.authorization;

        const token =
            authHeader && authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : undefined;

        if (!token) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Unauthorized: No token provided",
            });
            return;
        }

        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.email = decodedToken.email ?? null;
        res.locals.role = decodedToken.role ?? "user";

        next();
    } catch (error) {
        console.log("AUTH ERROR:", error);``
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Unauthorized: Invalid token",
        });
    }
};

export default authenticate;