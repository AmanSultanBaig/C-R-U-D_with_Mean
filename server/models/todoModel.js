const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model('TodoModel', TodoSchema, 'TodoCollection')