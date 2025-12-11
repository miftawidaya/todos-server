import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { handleZodErrorResponse } from '../../utils/error';
import { LoginRequestSchema } from '../../types/auth';
import { generateToken } from '../../utils/jwt';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user (JWT Authentication)
 *     description: Login endpoint that generates a real JWT token for authentication. Accepts any valid email and password (min 6 chars).
 *     tags:
 *       - Auth
 *     security: []
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "123e4567-e89b-12d3-a456-426614174000"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         name:
 *                           type: string
 *                           example: "user"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
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
    const user = {
      id: uuidv4(),
      email: loginData.email,
      name: loginData.email.split('@')[0], // Extract name from email
    };

    // Generate real JWT token
    const token = generateToken(user);

    const response = {
      success: true,
      message: 'Login successful',
      data: {
        token,
        user,
      },
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
