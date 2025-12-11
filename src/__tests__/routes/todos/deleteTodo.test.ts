import request from 'supertest';
import { app } from '../../../app';
import { generateTestToken } from '../../helpers/jwt.helper';

const AUTH_TOKEN = generateTestToken();

describe('DELETE /todos/:todoId', () => {
  describe('With valid JWT token', () => {
    it('should delete an existing todo', async () => {
      // First create a todo
      const createResponse = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          title: 'Todo to delete',
          completed: false,
        });

      const todoId = createResponse.body.data.id;

      // Then delete it
      const deleteResponse = await request(app)
        .delete(`/todos/${todoId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
      expect(deleteResponse.body.data).toHaveProperty('id', todoId);
    });

    it('should return empty object for non-existent todo', async () => {
      const response = await request(app)
        .delete('/todos/non-existent-id')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      // Current implementation returns wrapped empty object for non-existent
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual({});
    });
  });
});
