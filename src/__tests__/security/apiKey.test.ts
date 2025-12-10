import request from 'supertest';
import { app } from '../../app';

const VALID_API_KEY = 'test-api-key-for-testing';

describe('API Key Security', () => {
  describe('Protected endpoints without API key', () => {
    it('should return 401 for GET /todos without API key', async () => {
      const response = await request(app).get('/todos');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    it('should return 401 for POST /todos without API key', async () => {
      const response = await request(app).post('/todos').send({
        title: 'Test',
        completed: false,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    it('should return 401 for PUT /todos/:id without API key', async () => {
      const response = await request(app).put('/todos/some-id').send({
        title: 'Test',
        completed: false,
        date: new Date().toISOString(),
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    it('should return 401 for DELETE /todos/:id without API key', async () => {
      const response = await request(app).delete('/todos/some-id');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });
  });

  describe('Protected endpoints with invalid API key', () => {
    it('should return 401 for GET /todos with invalid API key', async () => {
      const response = await request(app)
        .get('/todos')
        .set('api-key', 'wrong-api-key');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    it('should return 401 with empty API key', async () => {
      const response = await request(app).get('/todos').set('api-key', '');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });
  });

  describe('Protected endpoints with valid API key', () => {
    it('should return 200 for GET /todos with valid API key', async () => {
      const response = await request(app)
        .get('/todos')
        .set('api-key', VALID_API_KEY);

      expect(response.status).toBe(200);
    });
  });

  describe('Public endpoints (no API key required)', () => {
    it('should allow POST /auth/login without API key', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      // Should not be 401
      expect(response.status).not.toBe(401);
      expect(response.status).toBe(200);
    });
  });
});
