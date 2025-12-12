import express from 'express';
import { getTodos } from '../../mockup/todos';

const router = express.Router();

type TodoKey = 'id' | 'title' | 'completed' | 'date' | 'priority';
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

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
 *         description: Filter by completion status (true/false). Omit to fetch all.
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *       - in: query
 *         name: dateGte
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: dateLte
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [id, title, completed, date, priority]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A paginated list of todos
 */

router.get('/', async (req, res) => {
  try {
    const {
      completed,
      priority,
      dateGte,
      dateLte,
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

    if (priority && ['LOW', 'MEDIUM', 'HIGH'].includes(priority as string)) {
      todos = todos.filter((todo) => todo.priority === (priority as Priority));
    }

    if (dateGte) {
      const gteDate = new Date(dateGte as string);
      todos = todos.filter((todo) => new Date(todo.date) >= gteDate);
    }

    if (dateLte) {
      const lteDate = new Date(dateLte as string);
      todos = todos.filter((todo) => new Date(todo.date) <= lteDate);
    }

    if (sort && ['id', 'title', 'completed', 'date', 'priority'].includes(sort as string)) {
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
      todos: paginatedTodos,
      totalTodos,
      hasNextPage,
      nextPage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as getTodosRouter };

