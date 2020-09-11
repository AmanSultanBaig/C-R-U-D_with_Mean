const todoSchema = require('../models/todoModel')
const mongoose = require('mongoose')

// get all Todos 
exports.get_TodoData = (req, res) => {
    todoSchema.find({})
        .then(todo => {
            if (todo.length) {
                res.status(200).json({
                    message: "All Todos Fetched",
                    data: todo
                })
            } else if (!todo.length) {
                res.status(200).json({
                    message: "No Todos Found in Database",
                })
            }
        })
        .catch(err => console.log(err))
}

// add todo with validate email and phone
exports.post_TodoData = (req, res) => {
    const Todo = new todoSchema({
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
    })
    Todo.save()
        .then(data => {
            res.status(200).json({
                message: "Todo Added Successfully!",
                payload: data
            })
        })
        .catch(err => console.log(err))
}

// get one todo by todo id
exports.get_TodoDataById = (req, res) => {
    const TodoId = new mongoose.Types.ObjectId(req.params.Todo_id)
    todoSchema.findById({ _id: TodoId })
        .then(oneTodo => {
            if (oneTodo.id) {
                res.status(200).json({
                    message: "One Todo Found",
                    data: oneTodo
                })
            } else if (!oneTodo) {
                res.status(404).json({
                    message: "Todo not found by given ID"
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(404).json({
                    message: err.message
                })
            }
        })
}

exports.update_TodoData = (req, res) => {
    const TodoId = new mongoose.Types.ObjectId(req.params.Todo_id)
    let updateTodo = {
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
    }

    todoSchema.findOneAndUpdate({ _id: TodoId }, updateTodo, { new: true })
        .then(updateTodo => {
            if (updateTodo) {
                res.status(200).send({
                    message: "Todo Updated Successfully",
                    updatedTodo: updateTodo
                });
            } else if (!updateTodo) {
                res.status(404).json({
                    message: "Todo not found by given ID"
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(404).json({
                    message: err.message
                })
            }
        })
}

// delete todo by todo id
exports.delete_TodoData = (req, res) => {
    todoSchema.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.Todo_id) })
        .then(deleteTodo => {
            if (deleteTodo.id) {
                res.status(200).json({
                    message: "Todo Deleted Successfully",
                    deletedTodo: deleteTodo
                })
            } else if (!deleteTodo) {
                res.status(404).json({
                    message: "Todo not found by given ID"
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(404).json({
                    message: err.message
                })
            }
        })
}