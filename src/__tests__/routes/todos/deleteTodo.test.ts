import request from 'supertest';
import { app } from '../../../app';

const API_KEY = 'test-api-key-for-testing';

describe('DELETE /todos/:todoId', () => {
  describe('With valid API key', () => {
    it('should delete an existing todo', async () => {
      // First create a todo
      const createResponse = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({
          title: 'Todo to delete',
          completed: false,
        });

      const todoId = createResponse.body.id;

      // Then delete it
      const deleteResponse = await request(app)
        .delete(`/todos/${todoId}`)
        .set('api-key', API_KEY);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toHaveProperty('id', todoId);
    });

    it('should return empty object for non-existent todo', async () => {
      const response = await request(app)
        .delete('/todos/non-existent-id')
        .set('api-key', API_KEY);

      // Current implementation returns empty object for non-existent
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
