import express from 'express';
import { handleZodErrorResponse } from '../../utils/error';
import { TodoSchema } from '../../types/todos';
import { getTodo, getTodos, setTodos } from '../../mockup/todos';

const router = express.Router();

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTodo'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */

router.put('/:id', async (req, res): Promise<void> => {
  try {
    const updatedTodo = TodoSchema.parse({
      ...req.body,
      id: req.params.id,
      date: new Date(req.body.date),
    });

    const todos = getTodos();

    const searchedTodo = todos.find((todo) => todo.id === updatedTodo.id);

    if (!searchedTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    setTodos(updatedTodo.id, updatedTodo);

    res.status(200).json(getTodo(updatedTodo.id));
  } catch (error) {
    console.error('Error updating todo:', error);

    if (handleZodErrorResponse(res, error)) {
      return;
    }

    res.status(500).json({ error: 'Failed to update todo' });
  }
});

export { router as updateTodoRouter };
