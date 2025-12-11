import express from 'express';
import { handleZodErrorResponse } from '../../utils/error';
import { z } from 'zod';
import { TodoSchema } from '../../types/todos';
import { deleteTodo, getTodo } from '../../mockup/todos';

const router = express.Router();

const deleteTodoParamsSchema = z.object({
  todoId: TodoSchema.shape.id,
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

router.delete('/:todoId', async (req, res) => {
  try {
    const { todoId } = deleteTodoParamsSchema.parse(req.params);

    const deletedTodo = getTodo(todoId) ?? {};

    deleteTodo(todoId);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo,
    });
  } catch (error) {
    console.error('Error deleting todo:', error);

    if (handleZodErrorResponse(res, error)) {
      return;
    }

    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export { router as deleteTodoRouter };
