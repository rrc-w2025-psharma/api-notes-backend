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
                return value; // keeps Joi defaults
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
                message: `Validation error: ${firstMessage}`,
            });
        }
    };
};