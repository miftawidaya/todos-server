import request from 'supertest';
import { app } from '../../../app';

describe('POST /auth/login', () => {
  describe('Valid requests', () => {
    it('should return token and user in standardized format on successful login', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user).toHaveProperty(
        'email',
        'test@example.com'
      );
    });

    it('should extract name from email', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'john.doe@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body.data.user.name).toBe('john.doe');
    });
  });

  describe('Invalid requests', () => {
    it('should return 400 for invalid email format', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for password shorter than 6 characters', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: '12345',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('detail');
    });

    it('should return 400 for missing email', async () => {
      const response = await request(app).post('/auth/login').send({
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for empty body', async () => {
      const response = await request(app).post('/auth/login').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
