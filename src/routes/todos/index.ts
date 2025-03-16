import express from 'express'
import { getTodosRouter } from './getTodos'
import { getScrollTodosRouter } from './getScrollTodos'
import { createTodoRouter } from './createTodo'
import { deleteTodoRouter } from './deleteTodo'
import { validatePrivateApiKey } from '../../middlewares'
import { updateTodoRouter } from './updateTodo'

const todosRouter = express.Router()

todosRouter.use('/', validatePrivateApiKey)

todosRouter.use('/', getTodosRouter)
todosRouter.use('/', getScrollTodosRouter)
todosRouter.use('/', createTodoRouter)
todosRouter.use('/', updateTodoRouter)
todosRouter.use('/', deleteTodoRouter)

export { todosRouter }
