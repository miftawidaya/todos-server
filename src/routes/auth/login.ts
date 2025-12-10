import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { handleZodErrorResponse } from '../../utils/error';
import { LoginRequestSchema, LoginResponse } from '../../types/auth';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's unique ID
 *                     email:
 *                       type: string
 *                       description: User's email
 *                     name:
 *                       type: string
 *                       description: User's name (optional)
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.post('/', async (req, res) => {
  try {
    // Validate request body
    const loginData = LoginRequestSchema.parse(req.body);

    // TODO: Implement actual authentication logic here
    // For now, we'll simulate a successful login

    // In production, you would:
    // 1. Find user by email in database
    // 2. Verify password hash
    // 3. Generate JWT token

    // Simulated user (replace with actual database lookup)
    const mockUser = {
      id: uuidv4(),
      email: loginData.email,
      name: loginData.email.split('@')[0], // Extract name from email
    };

    // Simulated token (replace with actual JWT generation)
    const mockToken = `mock-jwt-token-${uuidv4()}`;

    const response: LoginResponse = {
      token: mockToken,
      user: mockUser,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error during login:', error);

    // Handle Zod validation errors
    if (handleZodErrorResponse(res, error)) {
      return;
    }

    res.status(500).json({ error: 'Failed to login', detail: error });
  }
});

export { router as loginRouter };
