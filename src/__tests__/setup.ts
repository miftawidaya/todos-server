/**
 * Test setup file
 * Runs before each test file
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PRIVATE_API_KEY = 'test-api-key-for-testing';
process.env.PORT = '0'; // Use random available port

// Increase timeout for slower CI environments
jest.setTimeout(10000);

// Clean up after all tests
afterAll(async () => {
  // Add any cleanup logic here if needed
});
