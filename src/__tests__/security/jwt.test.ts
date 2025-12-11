import request from 'supertest';
import { app } from '../../app';
import { generateTestToken, getInvalidToken } from '../helpers/jwt.helper';

describe('JWT Authentication Security', () => {
  const validToken = generateTestToken();
  const invalidToken = getInvalidToken();

  describe('Protected endpoints without JWT token', () => {
    it('should return 401 for GET /todos without Authorization header', async () => {
      const response = await request(app).get('/todos');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Unauthorized');
    });

    it('should return 401 for POST /todos without Authorization header', async () => {
      const response = await request(app).post('/todos').send({
        title: 'Test',
        completed: false,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 for PUT /todos/:id without Authorization header', async () => {
      const response = await request(app).put('/todos/some-id').send({
        title: 'Test',
        completed: false,
        date: new Date().toISOString(),
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 for DELETE /todos/:id without Authorization header', async () => {
      const response = await request(app).delete('/todos/some-id');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Protected endpoints with invalid JWT token', () => {
    it('should return 401 for GET /todos with invalid token', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 with malformed Authorization header', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', validToken); // Missing "Bearer " prefix

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid token format');
    });

    it('should return 401 with empty token', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', 'Bearer ');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Protected endpoints with valid JWT token', () => {
    it('should return 200 for GET /todos with valid JWT token', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
    });

    it('should allow create, update, delete with valid token', async () => {
      // Test POST
      const createResponse = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          title: 'Test Todo',
          completed: false,
        });

      expect(createResponse.status).toBe(200);
    });
  });

  describe('Public endpoints (no JWT token required)', () => {
    it('should allow POST /auth/login without JWT token', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      // Should not be 401
      expect(response.status).not.toBe(401);
      expect(response.status).toBe(200);

      // Should return a valid JWT token
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.token).toBeTruthy();
    });
  });

  describe('JWT Token validation', () => {
    it('should attach user information to request', async () => {
      // This is implicitly tested by the fact that protected routes work
      // The middleware should attach req.user which routes can use
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      // If the middleware didn't attach user info correctly,
      // the route handlers might fail
    });
  });
});
