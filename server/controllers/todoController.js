const todoSchema = require('../models/todoModel')

exports.get_TodoData = (req, res) => {
    res.send("Getting Todos Data")
}

exports.post_TodoData = (req, res) => {
    res.send("posting Todos Data")
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