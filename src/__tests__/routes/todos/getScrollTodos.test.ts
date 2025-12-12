import request from 'supertest';
import { app } from '../../../app';
import { generateTestToken } from '../../helpers/jwt.helper';

const AUTH_TOKEN = generateTestToken();

describe('GET /todos/scroll', () => {
  describe('With valid JWT token', () => {
    it('should return todos with default pagination', async () => {
      const response = await request(app)
        .get('/todos/scroll')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty(
        'message',
        'Todos retrieved successfully'
      );
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('todos');
      expect(response.body.data).toHaveProperty('nextCursor');
      expect(response.body.data).toHaveProperty('hasNextPage');
      expect(Array.isArray(response.body.data.todos)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const limit = 5;
      const response = await request(app)
        .get('/todos/scroll')
        .query({ limit })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.data.todos.length).toBeLessThanOrEqual(limit);
    });

    it('should use cursor for pagination', async () => {
      const firstResponse = await request(app)
        .get('/todos/scroll')
        .query({ limit: 5 })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(firstResponse.status).toBe(200);
      const firstTodos = firstResponse.body.data.todos;
      const nextCursor = firstResponse.body.data.nextCursor;

      if (nextCursor !== null) {
        const secondResponse = await request(app)
          .get('/todos/scroll')
          .query({ nextCursor, limit: 5 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(secondResponse.status).toBe(200);
        const secondTodos = secondResponse.body.data.todos;

        // Ensure different todos are returned
        if (firstTodos.length > 0 && secondTodos.length > 0) {
          expect(firstTodos[0].id).not.toBe(secondTodos[0].id);
        }
      }
    });

    it('should return hasNextPage as false when no more todos', async () => {
      const response = await request(app)
        .get('/todos/scroll')
        .query({ limit: 1000 }) // Large limit to get all todos
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.data.hasNextPage).toBe(false);
      expect(response.body.data.nextCursor).toBeNull();
    });

    describe('Filtering', () => {
      it('should filter by completed=true', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ completed: 'true' })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        response.body.data.todos.forEach((todo: { completed: boolean }) => {
          expect(todo.completed).toBe(true);
        });
      });

      it('should filter by completed=false', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ completed: 'false' })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        response.body.data.todos.forEach((todo: { completed: boolean }) => {
          expect(todo.completed).toBe(false);
        });
      });

      it('should return all todos when completed is not specified', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos.length).toBeGreaterThan(0);
      });
    });

    describe('Sorting', () => {
      it('should sort by title ascending', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ sort: 'title', order: 'asc', limit: 20 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        const titles = response.body.data.todos.map(
          (t: { title: string }) => t.title
        );
        const sortedTitles = [...titles].sort();
        expect(titles).toEqual(sortedTitles);
      });

      it('should sort by title descending', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ sort: 'title', order: 'desc', limit: 20 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        const titles = response.body.data.todos.map(
          (t: { title: string }) => t.title
        );
        const sortedTitles = [...titles].sort().reverse();
        expect(titles).toEqual(sortedTitles);
      });

      it('should sort by date ascending', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ sort: 'date', order: 'asc', limit: 20 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        const dates = response.body.data.todos.map((t: { date: string }) =>
          new Date(t.date).getTime()
        );

        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i]).toBeLessThanOrEqual(dates[i + 1]);
        }
      });

      it('should sort by date descending', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ sort: 'date', order: 'desc', limit: 20 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        const dates = response.body.data.todos.map((t: { date: string }) =>
          new Date(t.date).getTime()
        );

        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
        }
      });

      it('should use default sort (date) when sort param is invalid', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ sort: 'invalid', limit: 10 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos).toBeDefined();
      });
    });

    describe('Combined filters and sorting', () => {
      it('should filter and sort together', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({
            completed: 'true',
            sort: 'title',
            order: 'asc',
            limit: 10,
          })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);

        // Check all are completed
        response.body.data.todos.forEach((todo: { completed: boolean }) => {
          expect(todo.completed).toBe(true);
        });

        // Check sorted by title
        const titles = response.body.data.todos.map(
          (t: { title: string }) => t.title
        );
        const sortedTitles = [...titles].sort();
        expect(titles).toEqual(sortedTitles);
      });

      it('should handle pagination with filters', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({
            completed: 'false',
            nextCursor: 0,
            limit: 5,
          })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos.length).toBeLessThanOrEqual(5);

        response.body.data.todos.forEach((todo: { completed: boolean }) => {
          expect(todo.completed).toBe(false);
        });
      });
    });

    describe('Edge cases', () => {
      it('should handle nextCursor as string', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ nextCursor: '5', limit: '3' })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos).toBeDefined();
      });

      it('should handle very large limit', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ limit: 999999 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.hasNextPage).toBe(false);
      });

      it('should handle zero limit', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ limit: 0 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos.length).toBe(0);
      });

      it('should handle cursor beyond total todos', async () => {
        const response = await request(app)
          .get('/todos/scroll')
          .query({ nextCursor: 999999 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.data.todos.length).toBe(0);
        expect(response.body.data.hasNextPage).toBe(false);
      });
    });
  });

  describe('Without JWT token', () => {
    it('should return 401 when no token is provided', async () => {
      const response = await request(app).get('/todos/scroll');

      expect(response.status).toBe(401);
    });
  });
});
