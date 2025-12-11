import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { todosRouter } from './routes/todos';
import { authRouter } from './routes/auth';

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

export const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

// Use CDN for Swagger UI assets to ensure they load correctly in serverless environment
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js',
    ],
    customSiteTitle: 'Todo API Documentation',
  })
);

// Expose raw swagger JSON for debugging
app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerDocs);
});

app.use('/todos', todosRouter);
app.use('/auth', authRouter);

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
}
