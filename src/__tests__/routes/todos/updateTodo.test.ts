import request from 'supertest';
import { app } from '../../../app';
import { generateTestToken } from '../../helpers/jwt.helper';

const AUTH_TOKEN = generateTestToken();

describe('PUT /todos/:id', () => {
  let existingTodoId: string;

  // Create a todo to update
  beforeAll(async () => {
    const response = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${AUTH_TOKEN}`)
      .send({
        title: 'Todo to update',
        completed: false,
      });
    existingTodoId = response.body.data.id;
  });

  describe('With valid JWT token', () => {
    it('should update an existing todo', async () => {
      const response = await request(app)
        .put(`/todos/${existingTodoId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          title: 'Updated title',
          completed: true,
          date: new Date().toISOString(),
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('title', 'Updated title');
      expect(response.body.data).toHaveProperty('completed', true);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/todos/non-existent-id')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          title: 'Test',
          completed: false,
          date: new Date().toISOString(),
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('Validation errors', () => {
    it('should return 400 for invalid body', async () => {
      const response = await request(app)
        .put(`/todos/${existingTodoId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
