import swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notes Management API",
            version: "1.0.0",
            description: "API documentation for the Notes Management API",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts"],
};

export const generateSwaggerSpec = (): object => swaggerJsdoc(swaggerOptions);