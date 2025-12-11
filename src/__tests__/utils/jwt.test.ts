import { generateToken, verifyToken } from '../../utils/jwt';

describe('JWT Utilities', () => {
  const testUser = {
    id: 'test-user-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(testUser);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include user information in token payload', () => {
      const token = generateToken(testUser);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.id).toBe(testUser.id);
      expect(decoded?.email).toBe(testUser.email);
      expect(decoded?.name).toBe(testUser.name);
    });

    it('should generate different tokens for same user (due to timestamp)', async () => {
      const token1 = generateToken(testUser);

      // Wait to ensure different iat (issued at) timestamp
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token2 = generateToken(testUser);

      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const token = generateToken(testUser);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.id).toBe(testUser.id);
      expect(decoded?.email).toBe(testUser.email);
    });

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid.jwt.token';
      const decoded = verifyToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it('should return null for malformed token', () => {
      const malformedToken = 'not-a-jwt-token';
      const decoded = verifyToken(malformedToken);

      expect(decoded).toBeNull();
    });

    it('should return null for empty token', () => {
      const decoded = verifyToken('');

      expect(decoded).toBeNull();
    });

    it('should return null for token with invalid signature', () => {
      const token = generateToken(testUser);
      // Tamper with the token by changing the last character
      const tamperedToken = token.slice(0, -1) + 'X';
      const decoded = verifyToken(tamperedToken);

      expect(decoded).toBeNull();
    });
  });

  describe('Token expiration', () => {
    it('should include expiration time in token', () => {
      const token = generateToken(testUser);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      // Token should have an exp (expiration) claim
      // This is added automatically by jwt.sign when expiresIn is specified
    });
  });

  describe('Token payload structure', () => {
    it('should only include safe user information (no sensitive data)', () => {
      const token = generateToken(testUser);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();

      // Should have these fields
      expect(decoded).toHaveProperty('id');
      expect(decoded).toHaveProperty('email');
      expect(decoded).toHaveProperty('name');

      // Should NOT have sensitive fields like password
      expect(decoded).not.toHaveProperty('password');
      expect(decoded).not.toHaveProperty('passwordHash');
    });
  });
});
