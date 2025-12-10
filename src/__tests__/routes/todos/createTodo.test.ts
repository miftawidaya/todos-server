import request from 'supertest';
import { app } from '../../../app';

const API_KEY = 'test-api-key-for-testing';

describe('POST /todos', () => {
  describe('With valid API key', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({
          title: 'Test todo',
          completed: false,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'Test todo');
      expect(response.body).toHaveProperty('completed', false);
      expect(response.body).toHaveProperty('date');
    });

    it('should create a completed todo', async () => {
      const response = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({
          title: 'Completed task',
          completed: true,
        });

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });
  });

  describe('Validation errors', () => {
    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({
          completed: false,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for missing completed', async () => {
      const response = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({
          title: 'Test',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for empty body', async () => {
      const response = await request(app)
        .post('/todos')
        .set('api-key', API_KEY)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
