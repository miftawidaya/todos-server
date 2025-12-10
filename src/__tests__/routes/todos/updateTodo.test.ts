import request from 'supertest';
import { app } from '../../../app';

const API_KEY = 'test-api-key-for-testing';

describe('PUT /todos/:id', () => {
  let existingTodoId: string;

  // Create a todo to update
  beforeAll(async () => {
    const response = await request(app)
      .post('/todos')
      .set('api-key', API_KEY)
      .send({
        title: 'Todo to update',
        completed: false,
      });
    existingTodoId = response.body.id;
  });

  describe('With valid API key', () => {
    it('should update an existing todo', async () => {
      const response = await request(app)
        .put(`/todos/${existingTodoId}`)
        .set('api-key', API_KEY)
        .send({
          title: 'Updated title',
          completed: true,
          date: new Date().toISOString(),
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated title');
      expect(response.body).toHaveProperty('completed', true);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/todos/non-existent-id')
        .set('api-key', API_KEY)
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
        .set('api-key', API_KEY)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
