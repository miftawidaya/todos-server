import express from 'express';
import { handleZodErrorResponse } from '../../utils/error';
import { NewTodoSchema } from '../../types/todos';
import { addTodo } from '../../mockup/todos';

const router = express.Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTodo'
 *     responses:
 *       200:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */

router.post('/', async (req, res) => {
  try {
    const newTodo = NewTodoSchema.parse(req.body);

    const insertedTodo = addTodo(newTodo);

    res.status(200).json({
      success: true,
      message: 'Todo created successfully',
      data: insertedTodo,
    });
  } catch (error) {
    console.error('Error creating todo:', error);

    if (handleZodErrorResponse(res, error)) {
      return;
    }

    res.status(500).json({ error: 'Failed to create todo' });
  }
});

export { router as createTodoRouter };
