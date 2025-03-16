import express from 'express';
import { getTodos } from 'mockup/todos';

const router = express.Router();

/**
 * @swagger
 * /todos/scroll:
 *   get:
 *     summary: Retrieve todos with optional filtering, sorting, and infinite scrolling
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter todos by their completion status
 *       - in: query
 *         name: nextCursor
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The starting index for the next batch of todos.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of todos to retrieve per request.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, date]
 *         description: Field to sort todos by.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order (ascending or descending).
 *     responses:
 *       200:
 *         description: A batch of todos for infinite scrolling
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 nextCursor:
 *                   type: integer
 *                   nullable: true
 *                   description: The cursor for the next batch, or null if no more todos.
 *                 hasNextPage:
 *                   type: boolean
 *                   description: Whether there are more todos to load.
 *       500:
 *         description: Server error
 */
router.get('/scroll', async (req, res) => {
  try {
    const {
      completed,
      nextCursor = 0,
      limit = 10,
      sort = 'date',
      order = 'asc',
    } = req.query;

    let todos = getTodos();

    if (completed === 'true') {
      todos = todos.filter((todo) => todo.completed);
    } else if (completed === 'false') {
      todos = todos.filter((todo) => !todo.completed);
    }

    if (sort && ['title', 'date'].includes(sort as string)) {
      todos = todos.sort((a, b) => {
        const key = sort as 'title' | 'date';

        const aValue = key === 'date' ? new Date(a[key]).getTime() : a[key];
        const bValue = key === 'date' ? new Date(b[key]).getTime() : b[key];

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const cursorNum = parseInt(nextCursor as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const paginatedTodos = todos.slice(cursorNum, cursorNum + limitNum);

    const newNextCursor = cursorNum + paginatedTodos.length;
    const hasNextPage = newNextCursor < todos.length;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({
      todos: paginatedTodos,
      nextCursor: hasNextPage ? newNextCursor : null,
      hasNextPage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as getScrollTodosRouter };
