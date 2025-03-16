import { Response } from 'express';
import { ZodError } from 'zod';

export const handleZodErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    res.status(400).json({
      error: 'Wrong front-end request format',
      detail: validationErrors,
    });
    return true;
  }

  return false;
};
