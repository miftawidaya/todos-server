import express from 'express';
import { handleZodErrorResponse } from '../../utils/error';
import { z } from 'zod';
import { TodoSchema } from '../../types/todos';
import { deleteTodo, getTodo } from '../../mockup/todos';

const router = express.Router();

const deleteTodoParamsSchema = z.object({
  id: TodoSchema.shape.id,
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The deleted todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', async (req, res) => {
  try {
    const { id } = deleteTodoParamsSchema.parse(req.params);

    const deletedTodo = getTodo(id);

    if (!deletedTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    deleteTodo(id);

    res.status(200).json(deletedTodo);
  } catch (error) {
    console.error('Error deleting todo:', error);

    if (handleZodErrorResponse(res, error)) {
      return;
    }

    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export { router as deleteTodoRouter };
