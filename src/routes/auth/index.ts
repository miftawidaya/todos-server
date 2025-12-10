import express from 'express';
import { loginRouter } from './login';

const authRouter = express.Router();

// POST /auth/login
authRouter.use('/login', loginRouter);

export { authRouter };
