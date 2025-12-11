import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

// Get production URL from environment variable or use localhost as default
// Users should set PRODUCTION_URL in their deployment environment (e.g., Vercel)
const productionUrl = process.env.PRODUCTION_URL || 'http://localhost:8080';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description:
        'REST API for managing todos - designed for learning frontend development',
    },
    servers: [
      {
        url: productionUrl,
        description: 'Production Server',
      },
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication operations',
      },
      {
        name: 'Todos',
        description: 'CRUD operations for todo items',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'api-key',
          description: 'API key for accessing protected endpoints',
        },
      },
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            title: { type: 'string', description: 'Todo title' },
            completed: { type: 'boolean', description: 'Completion status' },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
          },
          required: ['id', 'title', 'completed'],
        },
        NewTodo: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Todo title' },
            completed: { type: 'boolean', description: 'Completion status' },
          },
          required: ['title', 'completed'],
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (min 6 chars)',
            },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT token' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
            email: { type: 'string', description: 'User email' },
            name: { type: 'string', description: 'User name (optional)' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' },
            detail: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  path: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
  apis: ['./src/routes/todos/*.ts', './src/routes/auth/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Write to src/swagger.json so it can be imported
const outputPath = path.join(__dirname, '../src/swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2));

console.log(`Swagger JSON generated at ${outputPath}`);
