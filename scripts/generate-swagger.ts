import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

// Smart URL detection for Swagger documentation
// Priority: API_URL > VERCEL_URL > localhost
const getApiUrl = (): string => {
  // 1. Explicit API_URL (highest priority)
  // Set this in Vercel for production to use your custom domain
  // Example: https://api-todo-server.vercel.app
  if (process.env.API_URL) {
    return process.env.API_URL;
  }

  // 2. Auto-detect Vercel deployment URL
  // This will be the deployment URL (could be preview or production)
  // Example: https://project-abc123.vercel.app
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Default to localhost for local development
  return 'http://localhost:8080';
};

const apiUrl = getApiUrl();

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
        url: apiUrl,
        description: 'API Server',
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
