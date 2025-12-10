import { z } from 'zod';

// Schema for login request
export const LoginRequestSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Type inferred from schema
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Interface for user data
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Interface for login response
export interface LoginResponse {
  token: string;
  user: User;
}
