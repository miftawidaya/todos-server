import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import { todosRouter } from './routes/todos';
import { authRouter } from './routes/auth';

import swaggerDocs from './swagger.json';

// ... (other imports remain, but swaggerJsdoc is removed below)

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
