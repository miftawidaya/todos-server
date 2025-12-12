import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  date: z.date(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
});
export type Todo = z.infer<typeof TodoSchema>;

export const NewTodoSchema = TodoSchema.omit({ id: true, date: true });
export type NewTodo = z.infer<typeof NewTodoSchema>;

export const TodoWithoutDateSchema = TodoSchema.omit({ date: true });
