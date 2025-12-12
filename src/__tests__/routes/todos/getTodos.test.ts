import request from 'supertest';
import { app } from '../../../app';
import { generateTestToken } from '../../helpers/jwt.helper';

const AUTH_TOKEN = generateTestToken();

describe('GET /todos', () => {
  describe('With valid JWT token', () => {
    it('should return paginated todos', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

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
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.todos.length).toBeLessThanOrEqual(5);
    });

    it('should filter by completed status', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ completed: 'true' })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      response.body.todos.forEach((todo: { completed: boolean }) => {
        expect(todo.completed).toBe(true);
      });
    });

    it('should filter by incomplete status', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ completed: 'false' })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      response.body.todos.forEach((todo: { completed: boolean }) => {
        expect(todo.completed).toBe(false);
      });
    });

    it('should sort by title ascending', async () => {
      const response = await request(app)
        .get('/todos')
        .query({ sort: 'title', order: 'asc', limit: 10 })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      const titles = response.body.todos.map(
        (t: { title: string }) => t.title
      );
      const sortedTitles = [...titles].sort();
      expect(titles).toEqual(sortedTitles);
    });

    describe('Priority filter', () => {
      it('should filter by priority MEDIUM', async () => {
        const response = await request(app)
          .get('/todos')
          .query({ priority: 'MEDIUM', limit: 100 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.todos.length).toBeGreaterThan(0);
        response.body.todos.forEach((todo: { priority: string }) => {
          expect(todo.priority).toBe('MEDIUM');
        });
      });

      it('should ignore invalid priority value', async () => {
        const response = await request(app)
          .get('/todos')
          .query({ priority: 'INVALID', limit: 10 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.todos.length).toBeGreaterThan(0);
      });
    });

    describe('Date range filters', () => {
      it('should filter by dateGte', async () => {
        const mockYear = new Date().getFullYear() - 1;
        const dateGte = `${mockYear}-11-01T00:00:00.000Z`;
        
        const response = await request(app)
          .get('/todos')
          .query({ dateGte, limit: 100 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        response.body.todos.forEach((todo: { date: string }) => {
          expect(new Date(todo.date).getTime()).toBeGreaterThanOrEqual(new Date(dateGte).getTime());
        });
      });

      it('should filter by dateLte', async () => {
        const mockYear = new Date().getFullYear() - 1;
        const dateLte = `${mockYear}-10-15T23:59:59.999Z`;
        
        const response = await request(app)
          .get('/todos')
          .query({ dateLte, limit: 100 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        response.body.todos.forEach((todo: { date: string }) => {
          expect(new Date(todo.date).getTime()).toBeLessThanOrEqual(new Date(dateLte).getTime());
        });
      });

      it('should filter by date range (dateGte and dateLte)', async () => {
        const mockYear = new Date().getFullYear() - 1;
        const dateGte = `${mockYear}-10-01T00:00:00.000Z`;
        const dateLte = `${mockYear}-10-31T23:59:59.999Z`;
        
        const response = await request(app)
          .get('/todos')
          .query({ dateGte, dateLte, limit: 100 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        response.body.todos.forEach((todo: { date: string }) => {
          const todoDate = new Date(todo.date).getTime();
          expect(todoDate).toBeGreaterThanOrEqual(new Date(dateGte).getTime());
          expect(todoDate).toBeLessThanOrEqual(new Date(dateLte).getTime());
        });
      });
    });

    describe('Sorting', () => {
      it('should sort by priority', async () => {
        const response = await request(app)
          .get('/todos')
          .query({ sort: 'priority', order: 'asc', limit: 20 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.todos).toBeDefined();
      });

      it('should sort by date descending', async () => {
        const response = await request(app)
          .get('/todos')
          .query({ sort: 'date', order: 'desc', limit: 10 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        const dates = response.body.todos.map((t: { date: string }) =>
          new Date(t.date).getTime()
        );
        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
        }
      });

      it('should handle invalid sort field', async () => {
        const response = await request(app)
          .get('/todos')
          .query({ sort: 'invalid_field', limit: 10 })
          .set('Authorization', `Bearer ${AUTH_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.todos).toBeDefined();
      });
    });
  });
});
