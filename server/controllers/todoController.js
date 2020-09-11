const todoSchema = require('../models/todoModel')
const mongoose = require('mongoose')

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
        .catch(err => console.log(err))
}

exports.update_TodoData = (req, res) => {
    res.send("updating Todos Data")
}

exports.delete_TodoData = (req, res) => {
    res.send("deleting Todos Data")
}