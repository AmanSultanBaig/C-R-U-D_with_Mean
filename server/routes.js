const express = require('express');
const router = express.Router();

const TodoController = require('./controllers/todoController')

router.get('/api/getTodos', TodoController.get_TodoData)
router.get('/api/postTodo', TodoController.post_TodoData)
router.get('/api/getTodoById/:Todo_id', TodoController.get_TodoDataById)
router.get('/api/updateTodo/:Todo_id', TodoController.update_TodoData)
router.get('/api/deleteTodo/:Todo_id', TodoController.delete_TodoData)

module.exports = router