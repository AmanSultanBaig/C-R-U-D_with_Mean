const todoSchema = require('../models/todoModel')

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
    res.send("Getting Todos Data by id")
}

exports.update_TodoData = (req, res) => {
    res.send("updating Todos Data")
}

exports.delete_TodoData = (req, res) => {
    res.send("deleting Todos Data")
}