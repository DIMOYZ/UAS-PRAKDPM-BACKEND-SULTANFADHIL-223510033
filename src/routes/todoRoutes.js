const express = require('express');
const TodoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @typedef {object} Exercise
 * @property {string} exerciseType.required - Jenis Gerakan (e.g., Squat, Bench Press)
 * @property {number} weight.required - Berat dalam kilogram
 * @property {number} sets.required - Jumlah Set
 */

/**
 * @typedef {object} TodoRequest
 * @property {string} day.required - Hari (e.g., Senin)
 * @property {array.<Exercise>} exercises.required - Daftar Gerakan
 * @property {boolean} [completed] - Status penyelesaian
 */

/**
 * POST /api/todos
 * @summary Create a new todo
 * @tags Todos
 * @param {TodoRequest} request.body.required - Todo info
 * @return {object} 201 - Todo created successfully
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post('/', authMiddleware, TodoController.createTodo);

/**
 * GET /api/todos
 * @summary Get all todos
 * @tags Todos
 * @return {object} 200 - List of todos
 * @return {object} 500 - Server error
 */
router.get('/', authMiddleware, TodoController.getTodos);

/**
 * GET /api/todos/{id}
 * @summary Get a todo by ID
 * @tags Todos
 * @param {string} id.path.required - Todo ID
 * @return {object} 200 - Todo data
 * @return {object} 400 - Invalid ID
 * @return {object} 404 - Todo not found
 * @return {object} 500 - Server error
 */
router.get('/:id', authMiddleware, TodoController.getTodoById);

/**
 * PUT /api/todos/{id}
 * @summary Update a todo by ID
 * @tags Todos
 * @param {string} id.path.required - Todo ID
 * @param {TodoRequest} request.body.required - Todo info
 * @return {object} 200 - Todo updated successfully
 * @return {object} 400 - Validation error atau Invalid ID
 * @return {object} 404 - Todo not found
 * @return {object} 500 - Server error
 */
router.put('/:id', authMiddleware, TodoController.updateTodoById);

/**
 * DELETE /api/todos/{id}
 * @summary Delete a todo by ID
 * @tags Todos
 * @param {string} id.path.required - Todo ID
 * @return {object} 200 - Todo deleted successfully
 * @return {object} 400 - Invalid ID
 * @return {object} 404 - Todo not found
 * @return {object} 500 - Server error
 */
router.delete('/:id', authMiddleware, TodoController.deleteTodoById);

module.exports = router;
