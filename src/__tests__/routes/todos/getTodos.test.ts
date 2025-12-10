import request from 'supertest';
import { app } from '../../../app';

const API_KEY = 'test-api-key-for-testing';

describe('GET /todos', () => {
  describe('With valid API key', () => {
    it('should return paginated todos', async () => {
      const response = await request(app).get('/todos').set('api-key', API_KEY);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todos');
      expect(response.body).toHaveProperty('totalTodos');
      expect(response.body).toHaveProperty('hasNextPage');
      expect(Array.isArray(response.body.todos)).toBe(true);
    });

    it('should respect pagination params', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ page: 1, limit: 5 })
        .set('api-key', API_KEY);

      expect(response.status).toBe(200);
      expect(response.body.todos.length).toBeLessThanOrEqual(5);
    });

    it('should filter by completed status', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ completed: 'true' })
        .set('api-key', API_KEY);

      expect(response.status).toBe(200);
      response.body.todos.forEach((todo: { completed: boolean }) => {
        expect(todo.completed).toBe(true);
      });
    });

    it('should filter by incomplete status', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ completed: 'false' })
        .set('api-key', API_KEY);

      expect(response.status).toBe(200);
      response.body.todos.forEach((todo: { completed: boolean }) => {
        expect(todo.completed).toBe(false);
      });
    });

    it('should sort by title ascending', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ sort: 'title', order: 'asc', limit: 10 })
        .set('api-key', API_KEY);

      expect(response.status).toBe(200);
      const titles = response.body.todos.map((t: { title: string }) => t.title);
      const sortedTitles = [...titles].sort();
      expect(titles).toEqual(sortedTitles);
    });
  });
});
