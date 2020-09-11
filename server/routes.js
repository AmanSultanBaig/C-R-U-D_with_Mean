const express = require('express');
const router = express.Router();

const TodoController = require('./controllers/todoController')

const bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/api/getTodos', TodoController.get_TodoData)
router.post('/api/postTodo', jsonParser, TodoController.post_TodoData)
router.get('/api/getTodoById/:Todo_id', TodoController.get_TodoDataById)
router.put('/api/updateTodo/:Todo_id', jsonParser, TodoController.update_TodoData)
router.delete('/api/deleteTodo/:Todo_id', TodoController.delete_TodoData)

module.exports = router