import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { todosRouter } from './routes/todos';
import { authRouter } from './routes/auth';

type SwaggerRequest = {
  headers: Record<string, string>;
  method?: string;
  url?: string;
};

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

app.use(
  '/swagger-ui.css',
  express.static(path.join(__dirname, 'css/swagger-ui.css'))
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCssUrl: '/swagger-ui.css',
    customSiteTitle: 'Todo API Documentation',
    swaggerOptions: {
      requestInterceptor: (req: SwaggerRequest) => {
        const apiKey = process.env.PRIVATE_API_KEY;
        if (apiKey) {
          req.headers['api-key'] = apiKey;
        }
        return req;
      },
    },
  })
);

app.use('/todos', todosRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
