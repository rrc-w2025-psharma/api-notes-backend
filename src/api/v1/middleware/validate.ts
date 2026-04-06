import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { MiddlewareFunction } from "../types/expressTypes";
import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

const mapValidationMessage = (message: string): string => {
    const cleanMessage = message.replace(/"/g, "");

    if (
        cleanMessage.includes("title") ||
        cleanMessage.includes("content") ||
        cleanMessage.includes("categoryId")
    ) {
        return "Title, content, and categoryId are required";
    }

    if (cleanMessage.includes("Tag name is required")) {
        return "Tag name is required";
    }

    if (cleanMessage.includes("Category name is required")) {
        return "Category name is required";
    }

    if (cleanMessage.includes("name")) {
        return "Tag name is required";
    }

    return cleanMessage;
};

export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): MiddlewareFunction => {
    const defaultOptions = {
        stripBody: false,
        stripQuery: false,
        stripParams: false,
        ...options,
    };

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatePart = (
                schema: ObjectSchema,
                data: any,
                shouldStrip: boolean
            ) => {
                const { error, value } = schema.validate(data, {
                    abortEarly: true,
                    stripUnknown: shouldStrip,
                });

                if (error) throw error;
                return value;
            };

            if (schemas.body) {
                req.body = validatePart(
                    schemas.body,
                    req.body,
                    defaultOptions.stripBody
                );
            }

            if (schemas.params) {
                req.params = validatePart(
                    schemas.params,
                    req.params,
                    defaultOptions.stripParams
                );
            }

            if (schemas.query) {
                req.query = validatePart(
                    schemas.query,
                    req.query,
                    defaultOptions.stripQuery
                );
            }

            return next();
        } catch (error: unknown) {
            const joiError = error as any;
            const firstMessage =
                joiError?.details?.[0]?.message || (error as Error).message;

            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: mapValidationMessage(firstMessage),
            });
        }
    };
};

export default (schema: ObjectSchema) => validateRequest({ body: schema });