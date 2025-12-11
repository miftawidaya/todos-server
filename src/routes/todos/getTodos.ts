import express from 'express';
import { getTodos } from '../../mockup/todos';

const router = express.Router();

type TodoKey = 'id' | 'title' | 'completed' | 'date';

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Retrieve todos with optional filtering, pagination, and sorting
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *           nullable: true
 *         description: Filter todos by their completion status (true, false, or omit to fetch all).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (starting from 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of todos per page.
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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A paginated list of todos
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
 *                   example: Todos retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     todos:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Todo'
 *                     totalTodos:
 *                       type: integer
 *                       description: Total number of todos available.
 *                     hasNextPage:
 *                       type: boolean
 *                       description: Indicates if there is another page.
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       description: The next page number, or null if there are no more pages.
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the todo.
 *         title:
 *           type: string
 *           description: The title or name of the todo.
 *         completed:
 *           type: boolean
 *           description: Whether the todo is completed or not.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date associated with the todo.
 */

router.get('/', async (req, res) => {
  try {
    const {
      completed,
      page = 1,
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

    if (sort && ['id', 'title', 'completed', 'date'].includes(sort as string)) {
      todos = todos.sort((a, b) => {
        const key = sort as TodoKey;

        const aValue = key === 'date' ? new Date(a[key]).getTime() : a[key];
        const bValue = key === 'date' ? new Date(b[key]).getTime() : b[key];

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedTodos = todos.slice(startIndex, endIndex);

    const totalTodos = todos.length;
    const hasNextPage = endIndex < totalTodos;
    const nextPage = hasNextPage ? pageNum + 1 : null;

    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      data: {
        todos: paginatedTodos,
        totalTodos,
        hasNextPage,
        nextPage,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as getTodosRouter };
