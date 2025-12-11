import { generateToken } from '../../utils/jwt';

/**
 * Helper to generate a valid JWT token for testing
 */
export const generateTestToken = () => {
  const testUser = {
    id: 'test-user-id-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  return generateToken(testUser);
};

/**
 * Helper to create a mock invalid token
 */
export const getInvalidToken = () => {
  return 'invalid.jwt.token';
};

/**
 * Helper to get Authorization header with Bearer token
 */
export const getAuthHeader = (token: string) => {
  return `Bearer ${token}`;
};
